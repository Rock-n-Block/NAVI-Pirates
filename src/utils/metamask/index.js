import Web3 from 'web3';
import contractDetails from "../contractService/contractDetails";
import {isEqual} from 'lodash/lang';

const IS_PRODUCTION = false;

export default class MetamaskService {
    constructor() {
        this.name = 'metamask'
        this.wallet = window.ethereum;
        this.net = IS_PRODUCTION ? 'mainnet' : 'testnet'
        this.providers = {};
        this.providers.metamask = Web3.givenProvider;
        this.Web3Provider = new Web3(this.providers.metamask);
        this.wallet.on('chainChanged', (newChain) => {
            const chainId = localStorage.getItem('chainId')
            console.log('chainChanged')
            if (String(chainId) !== String(newChain)) {
                console.log('chains not equal',String(chainId),String(newChain))
                localStorage.setItem('chainId',newChain)
                window.location.reload()
            }
        });
        this.wallet.on('accountsChanged', (newAccounts) => {
            console.log('accountsChanged')
            const accounts = JSON.parse(localStorage.getItem('accounts'))
            if (!isEqual(accounts.accounts,newAccounts)) {
                console.log('accounts not equal',accounts,newAccounts)
                localStorage.setItem('accounts',JSON.stringify({accounts:newAccounts}))
                window.location.reload()
            }
        });
    }

    getAccount() {
        if (!this.wallet) throw new Error(`${this.name} wallet is not injected`);
        return new Promise((resolve, reject) => {
            const net = IS_PRODUCTION ? 'mainnet' : 'kovan'
            const usedNet = IS_PRODUCTION ? '0x1' : '0x2a'
            const netVersion = this.wallet.chainId

            if (netVersion === usedNet) {
                this.wallet.request({ method: 'eth_requestAccounts' })
                .then(account => resolve({
                    address: account[0]
                }))
                .catch(_ => reject({ errorMsg: 'Not authorized' }))
            } else {
                reject({
                    errorMsg: `Please choose ${net} network in ${this.name} wallet.`
                })
            }
        })
    }

    getContract(abi, address) {
        return new this.Web3Provider.eth.Contract(abi, address);
    }

    sendTx = async (methodName, addressFrom, data, amount) => {
        try {
            console.log('sendTx')
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

    encodeFunctionCall(abi, data) {
        return this.Web3Provider.eth.abi.encodeFunctionCall(abi, data);
    }

    getMethodInterface(methodName, abi) {
        return abi.filter((m) => {
            return m.name === methodName;
        })[0];
    }


}