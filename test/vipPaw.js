const BN = require("bn.js");
const chai = require("chai");
const { expect, assert } = require("chai");
const expectRevert = require("./utils/expectRevert.js");
const helper = require("openzeppelin-test-helpers/src/time.js");
const time = require("openzeppelin-test-helpers/src/time.js");
chai.use(require("chai-bn")(BN));

require('dotenv').config();
const {
    TOKEN_PRICE,
    SOFTCAP_IN_TOKENS,
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
const EIGHT = new BN(8);
const NINE = new BN(9);
const TEN = new BN(10);

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const vipPaw = artifacts.require('vipPaw');

contract(
    'vipPaw-test',
    ([
        vipPawOwner,
        user1,
        user2
    ]) => {
        let vipPawInst;
        let openTime;
        let closeTime;

        beforeEach(async () => {
            // Init contracts
            let timeNow = new BN((await web3.eth.getBlock("latest")).timestamp);
            openTime = timeNow;
            closeTime = openTime.add(new BN(60 * 60 * 24));

            vipPawInst = await vipPaw.new(
                NAME,
                SYMBOL,
                TOKEN_PRICE,
                SOFTCAP_IN_TOKENS,
                MAX_SUPPLY,
                openTime,
                closeTime,
                {from: vipPawOwner}
            );
        })

        it("#0 Deploy test", async () => {
            expect((await vipPawInst.tokenPrice()).toString()).to.be.equals(TOKEN_PRICE)
            expect((await vipPawInst.softCapInTokens()).toString()).to.be.equals(SOFTCAP_IN_TOKENS)
            expect(await vipPawInst.moneyCollected()).to.be.bignumber.that.equals(ZERO)
            expect((await vipPawInst.maxSupply()).toString()).to.be.equals(MAX_SUPPLY)
            expect(await vipPawInst.name()).to.be.equals(NAME);
            expect(await vipPawInst.symbol()).to.be.equals(SYMBOL);
            expect(await vipPawInst.totalSupply()).to.be.bignumber.that.equals(ZERO)
            expect(await vipPawInst.owner()).to.be.equals(vipPawOwner);
        })

        it("#1 Test open and close time of crowdsale", async () => {
            // test buy before open time
            let timeNow = new BN((await web3.eth.getBlock("latest")).timestamp);
            let openTime = timeNow.add(new BN(60 * 60 * 24));
            let closeTime = openTime.add(new BN(60 * 60 * 24));

            vipPawInst = await vipPaw.new(
                NAME,
                SYMBOL,
                TOKEN_PRICE,
                SOFTCAP_IN_TOKENS,
                MAX_SUPPLY,
                openTime,
                closeTime,
                {from: vipPawOwner}
            );

            await expectRevert(
                vipPawInst.buyToken(ONE, {from: user1, value: TOKEN_PRICE}),
                "vipPaw: Crowdsale is closed"
            );

            await helper.increase(openTime.sub(timeNow));
            await vipPawInst.buyToken(ONE, {from: user1, value: TOKEN_PRICE});

            await helper.increase(closeTime.sub(timeNow));
            await expectRevert(
                vipPawInst.buyToken(ONE, {from: user1, value: TOKEN_PRICE}),
                "vipPaw: Crowdsale is closed"
            );
        })

        it("#2 Test token buy and cashback", async () => {
            let tokenPrice = new BN(TOKEN_PRICE);
            let numTokens = ONE;
            await expectRevert(
                vipPawInst.buyToken(numTokens, {from: user1, value: tokenPrice.sub(ONE)}),
                "vipPaw: Wrong amount of money"
            );
            await expectRevert(
                vipPawInst.buyToken(numTokens, {from: user1, value: tokenPrice.add(ONE)}),
                "vipPaw: Wrong amount of money"
            );
            await expectRevert(
                vipPawInst.buyToken(numTokens, {from: user1, value: tokenPrice.mul(THREE)}),
                "vipPaw: Wrong amount of money"
            );
            numTokens = TWO;
            await expectRevert(
                vipPawInst.buyToken(numTokens, {from: user1, value: tokenPrice.mul(THREE)}),
                "vipPaw: Wrong amount of money"
            );
            numTokens = THREE;
            await expectRevert(
                vipPawInst.buyToken(numTokens, {from: user1, value: tokenPrice.mul(numTokens).add(ONE)}),
                "vipPaw: Wrong amount of money"
            );
            await expectRevert(
                vipPawInst.buyToken(numTokens, {from: user1, value: tokenPrice.mul(numTokens).sub(ONE)}),
                "vipPaw: Wrong amount of money"
            );
            numTokens = new BN(10001);
            await expectRevert(
                vipPawInst.buyToken(numTokens, {from: user1, value: tokenPrice.mul(numTokens)}),
                "vipPaw: Wrong amount of tokens to purchase"
            );
            numTokens = ZERO;
            await expectRevert(
                vipPawInst.buyToken(numTokens, {from: user1, value: tokenPrice.mul(numTokens)}),
                "vipPaw: Wrong amount of tokens to purchase"
            );

            expect(await vipPawInst.balanceOf(user1)).to.be.bignumber.that.equals(ZERO);
            numTokens = ONE;
            await vipPawInst.buyToken(numTokens, {from: user1, value: tokenPrice.mul(numTokens)});
            expect(await vipPawInst.balanceOf(user1)).to.be.bignumber.that.equals(ONE);

            numTokens = THREE;
            await vipPawInst.buyToken(numTokens, {from: user1, value: tokenPrice.mul(numTokens)});
            expect(await vipPawInst.balanceOf(user1)).to.be.bignumber.that.equals(FOUR);
            expect(await vipPawInst.moneyCollected()).to.be.bignumber.that.equals(tokenPrice.mul(FOUR));
            expect(await vipPawInst.tokenOfOwnerByIndex(user1, ZERO)).to.be.bignumber.that.equals(ZERO);
            expect(await vipPawInst.tokenOfOwnerByIndex(user1, ONE)).to.be.bignumber.that.equals(ONE);
            expect(await vipPawInst.tokenOfOwnerByIndex(user1, TWO)).to.be.bignumber.that.equals(TWO);
            expect(await vipPawInst.tokenOfOwnerByIndex(user1, THREE)).to.be.bignumber.that.equals(THREE);
        })

        it("#3 Test end of crowdsale with reach of hard cap", async () => {
            let softCap = TWO;
            let hardCap = TEN;

            let timeNow = new BN((await web3.eth.getBlock("latest")).timestamp);
            let openTime = timeNow;
            let closeTime = openTime.add(new BN(60 * 60 * 24));

            vipPawInst = await vipPaw.new(
                NAME,
                SYMBOL,
                TOKEN_PRICE,
                softCap,
                hardCap,
                openTime,
                closeTime,
                {from: vipPawOwner}
            );

            numTokens = TEN;
            let tokenPrice = new BN(TOKEN_PRICE);
            await vipPawInst.buyToken(numTokens, {from: user1, value: tokenPrice.mul(numTokens)});

            expect(await vipPawInst.balanceOf(user1)).to.be.bignumber.that.equals(numTokens);
            expect(await vipPawInst.moneyCollected()).to.be.bignumber.that.equals(tokenPrice.mul(numTokens));

            await expectRevert(
                vipPawInst.withdraw({from: user1, gasPrice: ZERO}),
                "vipPaw: Sender must be owner of the contract"
            );

            let ethBalanceOfVipPawOwnerBefore = new BN(await web3.eth.getBalance(vipPawOwner));
            await vipPawInst.withdraw({from: vipPawOwner, gasPrice: ZERO});
            let ethBalanceOfVipPawOwnerAfter = new BN(await web3.eth.getBalance(vipPawOwner));
            expect(ethBalanceOfVipPawOwnerAfter.sub(ethBalanceOfVipPawOwnerBefore)).to.be.bignumber.that.equals(
                tokenPrice.mul(numTokens)
            );

            await expectRevert(
                vipPawInst.withdraw({from: vipPawOwner, gasPrice: ZERO}),
                "vipPaw: Nothing to return"
            );
        })

        it("#4 Test end of crowdsale with reach of soft cap and not reach hard cap", async () => {
            let softCap = TWO;
            let hardCap = TEN;

            let timeNow = new BN((await web3.eth.getBlock("latest")).timestamp);
            let openTime = timeNow;
            let closeTime = openTime.add(new BN(60 * 60 * 24));

            vipPawInst = await vipPaw.new(
                NAME,
                SYMBOL,
                TOKEN_PRICE,
                softCap,
                hardCap,
                openTime,
                closeTime,
                {from: vipPawOwner}
            );

            numTokens = TWO;
            let tokenPrice = new BN(TOKEN_PRICE);
            await vipPawInst.buyToken(numTokens, {from: user1, value: tokenPrice.mul(numTokens)});

            expect(await vipPawInst.balanceOf(user1)).to.be.bignumber.that.equals(numTokens);
            expect(await vipPawInst.moneyCollected()).to.be.bignumber.that.equals(tokenPrice.mul(numTokens));

            await expectRevert(
                vipPawInst.withdraw({from: user1, gasPrice: ZERO}),
                "vipPaw: Crowdsale is not closed"
            );
            await expectRevert(
                vipPawInst.withdraw({from: vipPawOwner, gasPrice: ZERO}),
                "vipPaw: Crowdsale is not closed"
            );

            timeNow = new BN((await web3.eth.getBlock("latest")).timestamp);
            await helper.increase(closeTime.sub(timeNow));

            await expectRevert(
                vipPawInst.withdraw({from: user1, gasPrice: ZERO}),
                "vipPaw: Sender must be owner of the contract"
            );

            let ethBalanceOfVipPawOwnerBefore = new BN(await web3.eth.getBalance(vipPawOwner));
            await vipPawInst.withdraw({from: vipPawOwner, gasPrice: ZERO});
            let ethBalanceOfVipPawOwnerAfter = new BN(await web3.eth.getBalance(vipPawOwner));
            expect(ethBalanceOfVipPawOwnerAfter.sub(ethBalanceOfVipPawOwnerBefore)).to.be.bignumber.that.equals(
                tokenPrice.mul(numTokens)
            );

            await expectRevert(
                vipPawInst.withdraw({from: vipPawOwner, gasPrice: ZERO}),
                "vipPaw: Nothing to return"
            );
        })

        it("#5 Test end of crowdsale with no reach of soft cap", async () => {
            let softCap = EIGHT;
            let hardCap = TEN;

            let timeNow = new BN((await web3.eth.getBlock("latest")).timestamp);
            let openTime = timeNow;
            let closeTime = openTime.add(new BN(60 * 60 * 24));

            vipPawInst = await vipPaw.new(
                NAME,
                SYMBOL,
                TOKEN_PRICE,
                softCap,
                hardCap,
                openTime,
                closeTime,
                {from: vipPawOwner}
            );

            numTokens = FIVE;
            let tokenPrice = new BN(TOKEN_PRICE);
            await vipPawInst.buyToken(numTokens, {from: user1, value: tokenPrice.mul(numTokens)});

            expect(await vipPawInst.balanceOf(user1)).to.be.bignumber.that.equals(numTokens);
            expect(await vipPawInst.moneyCollected()).to.be.bignumber.that.equals(tokenPrice.mul(numTokens));

            await expectRevert(
                vipPawInst.withdraw({from: user1, gasPrice: ZERO}),
                "vipPaw: Crowdsale is not closed"
            );
            await expectRevert(
                vipPawInst.withdraw({from: vipPawOwner, gasPrice: ZERO}),
                "vipPaw: Crowdsale is not closed"
            );

            timeNow = new BN((await web3.eth.getBlock("latest")).timestamp);
            await helper.increase(closeTime.sub(timeNow));

            await expectRevert(
                vipPawInst.burnTokensToRefund(ZERO, {from: user2}),
                "vipPaw: Need to have vip paw cards to refund"
            );
            ethBalanceOfUser1Before = new BN(await web3.eth.getBalance(user1));
            await vipPawInst.burnTokensToRefund(ZERO, {from: user1, gasPrice: ZERO});
            ethBalanceOfUser1After = new BN(await web3.eth.getBalance(user1));
            expect(await vipPawInst.balanceOf(user1)).to.be.bignumber.that.equals(ZERO);
            expect(ethBalanceOfUser1After.sub(ethBalanceOfUser1Before)).to.be.bignumber.that.equals(tokenPrice.mul(numTokens));

            expect(await vipPawInst.moneyCollected()).to.be.bignumber.that.equals(ZERO);

            await expectRevert(
                vipPawInst.burnTokensToRefund(ZERO, {from: user1}),
                "vipPaw: Need to have vip paw cards to refund"
            );
        })

        it("#6 Test transfer", async () => {
            let numTokens = TWO;
            let tokenPrice = new BN(TOKEN_PRICE);
            await vipPawInst.buyToken(numTokens, {from: user1, value: tokenPrice.mul(numTokens)});

            expect(await vipPawInst.balanceOf(user1)).to.be.bignumber.that.equals(numTokens);

            await expectRevert(
                vipPawInst.transferFrom(user1, user2, ZERO, {from: user1}),
                "vipPaw: Transfers is not opened yet"
            );
            await expectRevert(
                vipPawInst.transferFrom(user1, user2, ONE, {from: user1}),
                "vipPaw: Transfers is not opened yet"
            );

            timeNow = new BN((await web3.eth.getBlock("latest")).timestamp);
            await helper.increase(closeTime.sub(timeNow));

            let ethBalanceOfUser1Before = new BN(await web3.eth.getBalance(user1));
            await vipPawInst.burnTokensToRefund(ONE, {from: user1, gasPrice: ZERO});
            let ethBalanceOfUser1After = new BN(await web3.eth.getBalance(user1));
            expect(await vipPawInst.balanceOf(user1)).to.be.bignumber.that.equals(ONE);
            expect(ethBalanceOfUser1After.sub(ethBalanceOfUser1Before)).to.be.bignumber.that.equals(tokenPrice);

            await vipPawInst.openTransfers({from: vipPawOwner});

            await vipPawInst.transferFrom(user1, user2, ONE, {from: user1});

            expect(await vipPawInst.balanceOf(user1)).to.be.bignumber.that.equals(ZERO);
            expect(await vipPawInst.balanceOf(user2)).to.be.bignumber.that.equals(ONE);

            let ethBalanceOfUser2Before = new BN(await web3.eth.getBalance(user2));
            await vipPawInst.burnTokensToRefund(ONE, {from: user2, gasPrice: ZERO});
            let ethBalanceOfUser2After = new BN(await web3.eth.getBalance(user2));
            expect(await vipPawInst.balanceOf(user2)).to.be.bignumber.that.equals(ZERO);
            expect(ethBalanceOfUser2After.sub(ethBalanceOfUser2Before)).to.be.bignumber.that.equals(tokenPrice);
        })
    }
)