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
    OWNER,
    BASE_URI,
    DEFAULT_TOKEN_URI,
    DEBUG
} = process.env;

const vipPaw = artifacts.require("vipPaw");

module.exports = async function (deployer, network) {
    if (network == "test" || network == "development")
        return;

    if (DEBUG == "true")
    {
        let vipPawInstArray = [];

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
            await vipPawInst.setBaseUri(BASE_URI);
            await vipPawInst.setDefaultTokenURI(DEFAULT_TOKEN_URI);
            await vipPawInst.transferOwnership(OWNER);
            vipPawInstArray.push(vipPawInst.address);
        }

        for(i = 0; i < vipPawInstArray.length; ++i){
            console.log(vipPawInstArray[i]);
        }
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
            PERCENT_OF_CASHBACK,
            OPEN_CROWDSALE_TIME,
            CLOSE_CROWDSALE_TIME
        );
        let vipPawInst = await vipPaw.deployed();

        await vipPawInst.transferOwnership(OWNER);
        await vipPawInst.setBaseUri(BASE_URI);
        await vipPawInst.setDefaultTokenURI(DEFAULT_TOKEN_URI);
    }
};