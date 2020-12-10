import contractDetails from './contractDetails';
import decimals from './decimals';
import BigNumber from "bignumber.js"

export default class ContractService {

    constructor(BinanceService) {
        this.binanceService = BinanceService

        this.pawContract = this.binanceService.getContract(contractDetails.PAW.ABI, contractDetails.PAW.ADDRESS)
    }

    tokenPrice = async () => {
        const price = await this.pawContract.methods.tokenPrice().call()

        return new BigNumber(price).dividedBy(new BigNumber(10).pow(decimals.BNB)).toFixed()
    }

    isClosedCrowdsale = () => {
        return this.pawContract.methods.isClosedCrowdsale().call()
    }

    isRefund = () => {
        return this.pawContract.methods.isRefund().call()
    }

    balanceOf = async (address) => {
        return Number(await this.pawContract.methods.balanceOf(address).call())
    }

    tokenOfOwnerByIndex = (address, index) => {
        return this.pawContract.methods.tokenOfOwnerByIndex(address,index).call()
    }

    cashbackOfToken = (id) => {
        return this.pawContract.methods.cashbackOfToken(id).call()
    }

    getCashback = (tokenId) => {
        return this.pawContract.methods.getCashback(tokenId).call()
    }
}