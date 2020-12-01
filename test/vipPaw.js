const BN = require("bn.js");
const chai = require("chai");
const { expect, assert } = require("chai");
const expectRevert = require("./utils/expectRevert.js");
const helper = require("openzeppelin-test-helpers/src/time.js");
/*
timeNow = new BN((await web3.eth.getBlock("latest")).timestamp);
await helper.increase(LAUNCH_TIME.add(ROUND_TIME.mul(currentDay.add(FIVE))).sub(timeNow).add(ONE));
*/
chai.use(require("chai-bn")(BN));

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
} = process.env;

const MINUS_ONE = new BN(-1);
const ZERO = new BN(0);
const ONE = new BN(1);
const TWO = new BN(2);
const THREE = new BN(3);
const FOUR = new BN(4);
const FIVE = new BN(5);
const SIX = new BN(6);
const SEVEN = new BN(7);

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const vipPaw = artifacts.require('vipPaw');

contract(
    'vipPaw-test',
    ([
        vipPawOwner
    ]) => {
        let vipPawInst;

        beforeEach(async () => {
            // Init contracts

            vipPawInst = await vipPaw.new(
                NAME,
                SYMBOL,
                INITIAL_TOKEN_PRICE,
                SOFTCAP_IN_TOKENS,
                MAX_SUPPLY,
                PERCENT_OF_CASHBACK,
                OPEN_CROWDSALE_TIME,
                CLOSE_CROWDSALE_TIME,
                {from: vipPawOwner}
            );
        })

        it("#0 Deploy test", async () => {
            expect((await vipPawInst.tokenPrice()).toString()).to.be.equals(INITIAL_TOKEN_PRICE)
            expect((await vipPawInst.softCapInTokens()).toString()).to.be.equals(SOFTCAP_IN_TOKENS)
            expect(await vipPawInst.moneyCollectedAll()).to.be.bignumber.that.equals(ZERO)
            expect(await vipPawInst.moneyForCashback()).to.be.bignumber.that.equals(ZERO)
            expect((await vipPawInst.maxSupply()).toString()).to.be.equals(MAX_SUPPLY)
            expect((await vipPawInst.percentOfCashback()).toString()).to.be.equals(PERCENT_OF_CASHBACK)
            expect(await vipPawInst.name()).to.be.equals(NAME);
            expect(await vipPawInst.symbol()).to.be.equals(SYMBOL);
            expect(await vipPawInst.totalSupply()).to.be.bignumber.that.equals(ZERO)
            expect(await vipPawInst.owner()).to.be.equals(vipPawOwner);
        })
    }
)