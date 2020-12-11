import Web3 from 'web3';
import BigNumber from "bignumber.js";
import contractDetails from "../contractService/contractDetails";
import decimals from "../contractService/decimals";

const IS_PRODUCTION = false;

export default class BinanceService {
    constructor() {
        this.binance = window['BinanceChain']
        this.Web3Provider = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
        this.binance.on('chainChanged', () => window.location.reload());
        this.binance.on('accountsChanged', () => window.location.reload());
    }

    getAccount() {
        return new Promise((resolve, reject) => {
            const net = IS_PRODUCTION ? 'binance smart chain' : 'binance smart chain test'
            const usedNet = IS_PRODUCTION ? '0x38' : '0x61'
            const netVersion = this.binance.chainId

            if (netVersion === usedNet) {
                this.binance.request({ method: 'eth_requestAccounts' })
                    .then(account => resolve({
                        address: account[0]
                    }))
                    .catch(_ => reject({ errorMsg: 'Not authorized' }))
            } else {
                reject({
                    errorMsg: 'Please choose ' + net + ' network in binance wallet.'
                })
            }

        })
    }

    getContract(abi, address) {
        return new this.Web3Provider.eth.Contract(abi, address);
    }

    buyToken = async (addressFrom, count, amount) => {
        const method = this.getMethodInterface('buyToken', contractDetails.PAW.ABI);
        const signature = this.encodeFunctionCall(method, [count]);
        const amountHex = this.Web3Provider.utils.toHex(amount);
        const params = {
            from: addressFrom,
            to: contractDetails.PAW.ADDRESS,
            value: amountHex,
            data: signature,
        };
        const txHash = await this.binance.request({
            method: 'eth_sendTransaction',
            params: [params],
        })
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