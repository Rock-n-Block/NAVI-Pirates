import contractDetails from './contractDetails';
import decimals from './decimals';
import BigNumber from "bignumber.js";

const IS_PRODUCTION = false;

export default class ContractService {

    constructor(wallet) {
        this.wallet = wallet
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
            // const maxGasPerTx = await this.wallet.gasLimit();
            // const amountOfOneToken = await this.amountOfCount(1)
            // const gasOfOneToken = await this.wallet.estimateGasTx('buyToken',address,[1],amountOfOneToken)
            // const amount = await this.amountOfCount(count)
            // const gas = await this.wallet.estimateGasTx('buyToken',address,[count],amount)
            // const maxTokensToBuyInTx = Math.floor(maxGasPerTx / gasOfOneToken)
            // const maxAmountInTx = await this.amountOfCount(maxTokensToBuyInTx)
            // const maxGasInTx = await this.wallet.estimateGasTx('buyToken',address,[maxTokensToBuyInTx],maxAmountInTx)
            // const remainderCount = Math.ceil((gas - maxGasInTx) / gasOfOneToken)
            // const iterations = Math.ceil(gas / maxGasInTx)
            // console.log('maxGasPerTx',maxGasPerTx)
            // console.log('gas',gas)
            // console.log('gasOfOneToken',gasOfOneToken)
            // console.log('maxTokensToBuyInTx',maxTokensToBuyInTx)
            // console.log('remainderCount',remainderCount)
            // console.log('iterations',iterations)
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