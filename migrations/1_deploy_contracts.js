require('dotenv').config();
const {
    INITIAL_TOKEN_PRICE,
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

    let vipPawInst = await deployer.deploy(
        vipPaw,
        NAME,
        SYMBOL,
        INITIAL_TOKEN_PRICE,
        SOFTCAP_IN_TOKENS,
        MAX_SUPPLY,
        PERCENT_OF_CASHBACK,
        OPEN_CROWDSALE_TIME,
        CLOSE_CROWDSALE_TIME
    );

    //console.log(await vipPawInst.owner());
    await vipPawInst.transferOwnership(OWNER);
};