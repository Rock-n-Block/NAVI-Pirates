import Web3 from 'web3';
import {isEqual} from 'lodash/lang';

import contractDetails from "../contractService/contractDetails";

const IS_PRODUCTION = false;

export default class MetamaskService {
    constructor() {
        this.name = 'metamask'
        this.wallet = window.ethereum;
        this.net = IS_PRODUCTION ? 'mainnet' : 'testnet'
        this.providers = {};
        this.Web3Provider = new Web3(this.wallet);
        this.wallet.on('chainChanged', (newChain) => {
            window.location.reload()
        });
        this.wallet.on('accountsChanged', (newAccounts) => {
            console.log('accountsChanged',newAccounts)
            const accounts = JSON.parse(localStorage.getItem('accounts'))
            if (!accounts || !isEqual(accounts.accounts,newAccounts)) {
                localStorage.setItem('accounts',JSON.stringify({accounts:newAccounts}))
                window.location.reload()
            }
        });
    }

    getAccount() {
        if (!this.wallet) {
            return {
                errorMsg: `${this.name} wallet is not injected`
            }
        }
        return new Promise((resolve, reject) => {
            const net = IS_PRODUCTION ? 'mainnet' : 'kovan'
            const usedNet = IS_PRODUCTION ? '0x1' : '0x2a'
            const netVersion = this.wallet.chainId
            if (!netVersion || netVersion===null) {
                this.wallet.request({ method: 'eth_chainId' })
                .then(netVersion => {
                    if (netVersion === usedNet) {
                        this.wallet.request({ method: 'eth_requestAccounts' })
                        .then(account => resolve({
                            address: account[0]
                        }))
                        .catch(_ => reject({ errorMsg: 'Not authorized' }))
                    } else {
                        reject({
                            errorMsg: 'Please choose ' + net + ' network in metamask wallet'
                        })
                    }
                })
                .catch(_ => reject({ errorMsg: 'Not authorized' }))
            } else {
                if (netVersion === usedNet) {
                    this.wallet.request({ method: 'eth_requestAccounts' })
                    .then(account => resolve({
                        address: account[0]
                    }))
                    .catch(_ => reject({ errorMsg: 'Not authorized' }))
                } else {
                    reject({
                        errorMsg: 'Please choose ' + net + ' network in metamask wallet.'
                    })
                }
            }
        })
    }

    getContract(abi, address) {
        return new this.Web3Provider.eth.Contract(abi, address);
    }

    sendTx = async (methodName, addressFrom, data, amount) => {
        try {
            const method = this.getMethodInterface(methodName, contractDetails.PAW.ABI);
            const signature = this.encodeFunctionCall(method, data);
            const params = {
                from: addressFrom,
                to: contractDetails.PAW.ADDRESS[this.name][this.net],
                value: amount,
                data: signature,
            };
            const txHash = await this.wallet.request({
                method: 'eth_sendTransaction',
                params: [params],
            });
            const txReceipt = new Promise((resolve, reject) => {
                const trxSubscription = setInterval(() => {
                    this.Web3Provider.eth.getTransactionReceipt(
                    txHash,
                    (error, transaction) => {
                        if (transaction) {
                            if (transaction.status) {
                                resolve(transaction);
                            } else {
                                reject(error);
                            }
                            clearInterval(trxSubscription);
                        }
                        if (error) {
                            clearInterval(trxSubscription);
                        }
                    },
                    );
                }, 1000);
            })
            return await txReceipt;
        } catch (e) {
            console.error(e);
        }
    }

    estimateGasTx = async (methodName, addressFrom, data, amount) => {
        try {
            const method = this.getMethodInterface(methodName, contractDetails.PAW.ABI);
            const signature = this.encodeFunctionCall(method, data);
            const params = {
                from: addressFrom,
                to: contractDetails.PAW.ADDRESS[this.name][this.net],
                value: amount,
                data: signature,
            };
            const result = await this.Web3Provider.eth.estimateGas(params)
            return result;
        } catch (e) {
            console.error(e);
        }
    }

    encodeFunctionCall(abi, data) {
        return this.Web3Provider.eth.abi.encodeFunctionCall(abi, data);
    }

    getMethodInterface(methodName, abi) {
        return abi.filter((m) => {
            return m.name === methodName;
        })[0];
    }

    async gasLimit() {
        const block = await this.Web3Provider.eth.getBlock("latest");
        return await block.gasLimit;
    }


}