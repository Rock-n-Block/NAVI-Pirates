require('dotenv').config();
const {
    TOKEN_PRICE,
    SOFTCAP_IN_TOKENS,
    PERCENT_OF_CASHBACK,
    OPEN_CROWDSALE_TIME,
    CLOSE_CROWDSALE_TIME,
    MAX_SUPPLY,
    NAME,
    SYMBOL,
    OWNER
} = process.env;

const vipPaw = artifacts.require("vipPaw");

module.exports = async function (deployer, network) {
    if (network == "test")
        return;

    /* let vipPawInstArray = [];

    for(i = 0; i < 10; ++i){
        await deployer.deploy(
            vipPaw,
            NAME,
            SYMBOL,
            TOKEN_PRICE,
            SOFTCAP_IN_TOKENS,
            MAX_SUPPLY,
            PERCENT_OF_CASHBACK,
            OPEN_CROWDSALE_TIME,
            CLOSE_CROWDSALE_TIME
        );
        let vipPawInst = await vipPaw.deployed();
        await vipPawInst.transferOwnership(OWNER);
        vipPawInstArray.push(vipPawInst.address);
    }

    for(i = 0; i < vipPawInstArray.length; ++i){
        console.log(vipPawInstArray[i]);
    } */
    await deployer.deploy(
        vipPaw,
        NAME,
        SYMBOL,
        TOKEN_PRICE,
        SOFTCAP_IN_TOKENS,
        MAX_SUPPLY,
        PERCENT_OF_CASHBACK,
        OPEN_CROWDSALE_TIME,
        CLOSE_CROWDSALE_TIME
    );
    let vipPawInst = await vipPaw.deployed();

    await vipPawInst.transferOwnership(OWNER);
};