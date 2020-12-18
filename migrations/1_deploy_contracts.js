const BN = require('bn.js');

require('dotenv').config();
const {
    TOKEN_PRICE,
    SOFTCAP_IN_TOKENS,
    OPEN_CROWDSALE_TIME,
    CLOSE_CROWDSALE_TIME,
    MAX_SUPPLY,
    NAME,
    SYMBOL,
    OWNER,
    BASE_URI,
    DEFAULT_TOKEN_URI,
    MAX_TOKENS_TO_BUY_IN_TX_BSC,
    MAX_TOKENS_TO_BUY_IN_TX_ETH_MAINNET,
    MAX_TOKENS_TO_BUY_IN_TX_KOVAN,
    MAX_TOKENS_TO_BUY_IN_TX_ROPSTEN,
} = process.env;

const vipPaw = artifacts.require("vipPaw");

const debug = "false";

const ZERO = new BN(0);

module.exports = async function (deployer, network) {
    if (network == "test" || network == "development")
        return;

    let maxTokensToBuyInTx;
    if (network == "mainnet")
        maxTokensToBuyInTx = new BN(MAX_TOKENS_TO_BUY_IN_TX_ETH_MAINNET);
    else if (network == "bsc" || network == "bscTestnet")
        maxTokensToBuyInTx = new BN(MAX_TOKENS_TO_BUY_IN_TX_BSC);
    else if (network == "ropsten")
        maxTokensToBuyInTx = new BN(MAX_TOKENS_TO_BUY_IN_TX_ROPSTEN);
    else if (network == "kovan")
        maxTokensToBuyInTx = new BN(MAX_TOKENS_TO_BUY_IN_TX_KOVAN);
    else
        return;

    let numContracts;
    if (debug == "true" && (network == "bsc" || network == "bscTestnet"))
        numContracts = new BN(10);
    else
        numContracts = new BN(1);

    let vipPawInstArray = [];

    for(i = 0; i < numContracts; ++i){
        if (debug == "true")
        {
            await deployer.deploy(
                vipPaw,
                NAME,
                SYMBOL,
                TOKEN_PRICE,
                new BN(500),
                new BN(1000),
                ZERO,
                ZERO,
                maxTokensToBuyInTx,
                true
            );
        }
        else
        {
            await deployer.deploy(
                vipPaw,
                NAME,
                SYMBOL,
                TOKEN_PRICE,
                SOFTCAP_IN_TOKENS,
                MAX_SUPPLY,
                OPEN_CROWDSALE_TIME,
                CLOSE_CROWDSALE_TIME,
                maxTokensToBuyInTx,
                false
            );
        }
        let vipPawInst = await vipPaw.deployed();
        await vipPawInst.setBaseUri(BASE_URI);
        await vipPawInst.setDefaultTokenURI(DEFAULT_TOKEN_URI);
        await vipPawInst.transferOwnership(OWNER);
        vipPawInstArray.push(vipPawInst.address);
    }

    for(i = 0; i < vipPawInstArray.length; ++i){
        console.log(vipPawInstArray[i]);
    }
};