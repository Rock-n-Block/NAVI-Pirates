import React from "react";
import BigNumber from "bignumber.js";

import contractDetails from './contractDetails';
import decimals from './decimals';

const IS_PRODUCTION = false;

export default class ContractService {

    constructor(wallet,isMobile) {
        this.wallet = wallet
        this.isMobile = isMobile
        this.net = IS_PRODUCTION ? 'mainnet' : 'testnet'
        this.pawContract = this.wallet.getContract(
        contractDetails.PAW.ABI,
        contractDetails.PAW.ADDRESS[wallet.name][this.net]
        )
        this.contractAddress = contractDetails.PAW.ADDRESS[wallet.name][this.net]
    }

    tokenPrice = async () => {
        try {
            const price = await this.pawContract.methods.tokenPrice().call()
            return new BigNumber(price).dividedBy(new BigNumber(10).pow(decimals.BNB)).toFixed()
        } catch (e) {
            console.error('tokenPrice',e);
        }
    }

    isClosedCrowdsale = () => {
        return this.pawContract.methods.isClosedCrowdsale().call()
    }

    isRefund = async (address) => {
        try {
            const isRefund = await this.pawContract.methods.isRefund().call()
            // const isRefund = await this.wallet.sendTx('isRefund',address,[],0)
            return isRefund
        } catch (e) {
            console.error('isRefund',e);
        }
    }

    balanceOf = async (address) => {
        return Number(await this.pawContract.methods.balanceOf(address).call())
    }

    tokenOfOwnerByIndex = (address, index) => {
        return this.pawContract.methods.tokenOfOwnerByIndex(address,index).call()
    }

    burnTokensToRefund = async (address) => {
        const burn = await this.wallet.sendTx('burnTokensToRefund',address,[],0)
        return burn
    }

    cashbackOfToken = async (id) => {
        const cashback = await this.pawContract.methods.cashbackOfToken(id).call()
        return new BigNumber(cashback).dividedBy(new BigNumber(10).pow(decimals.BNB)).toFixed()
    }

    getCashback = (address,tokenId) => {
        return this.wallet.sendTx('getCashback',address,[tokenId],0)
    }

    maxTokensToBuyInTx = async () => {
        return await this.pawContract.methods.maxTokensToBuyInTx().call()
    }

    amountOfCount = async (count) => {
        const tokenPrice = await this.tokenPrice();
        let amount = new BigNumber(count)
        .multipliedBy(new BigNumber(tokenPrice))
        .multipliedBy(new BigNumber(10).pow(decimals.BNB)).toFixed();
        amount = '0x' + (+amount).toString(16)
        return amount
    }

    buyManyTokens = async (address, count) => {
        try {
            const maxTokensToBuyInTx = await this.maxTokensToBuyInTx();
            const remainderCount = count % maxTokensToBuyInTx; // остаток
            const iterations = Math.ceil(count / maxTokensToBuyInTx);
            // const maxTokensToBuyInTxFromContract = await this.maxTokensToBuyInTx();
            // const gasLimit = await this.wallet.gasLimit();
            // const maxGasPerTx = 5500000; //пришлось хорошо перестраховаться для метамаска
            // const amountOfOneToken = await this.amountOfCount(1)
            // const gasOfOneToken = await this.wallet.estimateGasTx('buyToken',address,[1],amountOfOneToken)
            // const amount = await this.amountOfCount(count)
            // const gas = await this.wallet.estimateGasTx('buyToken',address,[count],amount)
            // const maxTokensToBuyInTx = this.isMobile ? Math.floor(maxGasPerTx / gasOfOneToken) : maxTokensToBuyInTxFromContract;
            // const maxAmountInTx = await this.amountOfCount(maxTokensToBuyInTx)
            // const maxGasInTx = await this.wallet.estimateGasTx('buyToken',address,[maxTokensToBuyInTx],maxAmountInTx)
            // const remainderCount = Math.ceil((count % maxTokensToBuyInTx))
            // const iterations = Math.ceil(gas / maxGasInTx)
            // console.log('gasLimit',gasLimit)
            // console.log('maxGasPerTx',maxGasPerTx)
            // console.log('gasOfOneToken',gasOfOneToken)
            // console.log('gas',gas)
            // console.log('maxTokensToBuyInTx',maxTokensToBuyInTx)
            // console.log('maxGasInTx',maxGasInTx)
            // console.log('remainderCount',remainderCount)
            // console.log('iterations',iterations)
            // return (
            // <div style={{textAlign:'left'}}>
            //     maxGasPerTx: {maxGasPerTx} <br/>
            //     gasOfOneToken: {gasOfOneToken} <br/>
            //     gas: {gas} <br/>
            //     maxTokensToBuyInTx: {maxTokensToBuyInTx} <br/>
            //     maxGasInTx: {maxGasInTx} <br/>
            //     remainderCount: {remainderCount} <br/>
            //     iterations: {iterations}
            // </div>
            // )
            if (iterations < 2)
                return await this.buyTokens(address,count);
            for (let i = 0; i < iterations; i++) {
                if (i === iterations - 1) {
                    return await this.buyTokens(address,remainderCount)
                } else {
                    await this.buyTokens(address,maxTokensToBuyInTx)
                }
            }
        } catch (e) {
            console.error(e);
        }
    }


    buyTokens = async (address, count, amount) => {
      try {
        const tokenPrice = await this.tokenPrice();
        let amount = new BigNumber(count)
        .multipliedBy(new BigNumber(tokenPrice))
        .multipliedBy(new BigNumber(10).pow(decimals.BNB)).toFixed();
        amount = '0x' + (+amount).toString(16)
        return await this.wallet.sendTx('buyToken',address,[count],amount)
      } catch (e) {
        console.error(e);
      }
    }

    refundManyTokens = async (address, count) => {
        try {
            const maxTokensToBuyInTx = await this.maxTokensToBuyInTx();
            const remainderCount = count % maxTokensToBuyInTx; // остаток
            const iterations = Math.ceil(count / maxTokensToBuyInTx);
            // const maxGasPerTx = this.isMobile ? 5500000 : await this.wallet.gasLimit(); //пришлось хорошо перестраховаться
            // const amountOfOneToken = await this.amountOfCount(1)
            // const gasOfOneToken = await this.wallet.estimateGasTx('burnTokensToRefund',address,[1],amountOfOneToken)
            // const amount = await this.amountOfCount(count)
            // const gas = await this.wallet.estimateGasTx('burnTokensToRefund',address,[count],amount)
            // const maxTokensToBuyInTx = Math.floor(maxGasPerTx / gasOfOneToken)
            // const maxAmountInTx = await this.amountOfCount(maxTokensToBuyInTx)
            // const maxGasInTx = await this.wallet.estimateGasTx('burnTokensToRefund',address,[maxTokensToBuyInTx],maxAmountInTx)
            // const remainderCount = Math.ceil((count % maxTokensToBuyInTx))
            // const iterations = Math.ceil(gas / maxGasInTx)
            // console.log('maxGasPerTx',maxGasPerTx)
            // console.log('gasOfOneToken',gasOfOneToken)
            // console.log('gas',gas)
            // console.log('maxTokensToBuyInTx',maxTokensToBuyInTx)
            // console.log('maxGasInTx',maxGasInTx)
            // console.log('remainderCount',remainderCount)
            // console.log('iterations',iterations)
            // return `
            // maxGasPerTx: ${maxGasPerTx} \n
            // gasOfOneToken: ${gasOfOneToken} \n
            // gas: ${gas} \n
            // maxTokensToBuyInTx: ${maxTokensToBuyInTx} \n
            // maxGasInTx: ${maxGasInTx} \n
            // remainderCount: ${remainderCount} \n
            // iterations: ${iterations}
            // `
            if (iterations < 2)
                return await this.refundTokens(address,count);
            for (let i = 0; i < iterations; i++) {
                if (i === iterations - 1) {
                    return await this.refundTokens(address,remainderCount)
                } else {
                    await this.refundTokens(address,maxTokensToBuyInTx)
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    refundTokens = async (address, count) => {
      try {
        return await this.wallet.sendTx('burnTokensToRefund',address,[count],0)
      } catch (e) {
        console.error(e);
      }
    }

}
