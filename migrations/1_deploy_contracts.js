require('dotenv').config();
const {
    NAME,
    SYMBOL,
    INITIAL_TOKEN_PRICE,
    PRICE_STEP,
    PRICE_INCREASE_NUMERATOR,
    PRICE_INCREASE_DENOMINATOR,
    ETH_TO_GAME_NUMERATOR,
    ETH_TO_GAME_DENOMINATOR,
    OWNER
} = process.env;

const PAW = artifacts.require("PAW");

module.exports = async function (deployer) {
    let PawInst = await deployer.deploy(
        PAW,
        NAME,
        SYMBOL,
        INITIAL_TOKEN_PRICE,
        PRICE_STEP,
        PRICE_INCREASE_NUMERATOR,
        PRICE_INCREASE_DENOMINATOR,
        ETH_TO_GAME_NUMERATOR,
        ETH_TO_GAME_DENOMINATOR,
        OWNER
    );
};