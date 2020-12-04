// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract vipPaw is ERC721, Ownable
{
    using SafeMath for uint256;

    uint256 public tokenPrice;
    uint256 public softCapInTokens;
    uint256 public moneyCollectedAll;
    uint256 public moneyForCashback;

    uint256 private lastTokenId;
    uint256 public maxSupply = 10000;
    // mapping id of token to the number of cashback that is available to this token
    // 1 is 0.1%
    uint256 public percentOfCashback;
    mapping (uint256 => uint256) public cashbackOfToken;
    mapping (address => uint256) public withdrawForUserWhenRefund;

    uint256 public openCrowdsaleTime;
    uint256 public closeCrowdsaleTime;

    event TokensPurchased(
        address user,
        uint256 count,
        uint256 timestamp
    );

    constructor(
        string memory name,
        string memory symbol,
        uint256 _tokenPrice,
        uint256 _softCapInTokens,
        uint256 _maxSupply,
        uint256 _percentOfCashback,
        uint256 _openCrowdsaleTime,
        uint256 _closeCrowdsaleTime
    )
        public
        ERC721(name, symbol)
    {
        require(
            _percentOfCashback >= 0 && _percentOfCashback <= 1000,
            "vipPaw: Wrong percent of cashback"
        );
        require(
            _softCapInTokens <= _maxSupply,
            "vipPaw: Wrong soft cap"
        );
        require(
            _closeCrowdsaleTime > now &&
            _openCrowdsaleTime <= _closeCrowdsaleTime,
            "vipPaw: Wrong open and close time of crowdsale"
        );

        tokenPrice = _tokenPrice;
        softCapInTokens = _softCapInTokens;
        maxSupply = _maxSupply;
        percentOfCashback = _percentOfCashback;
        openCrowdsaleTime = _openCrowdsaleTime;
        closeCrowdsaleTime = _closeCrowdsaleTime;
    }

    /* bool isFirstTime = true;
    function startCrowdsale() external onlyOwner
    {
        require(
            isFirstTime == true,
            "vipPaw: Can not open crowdsale twice"
        );
        openCrowdsaleTime = now;
        closeCrowdsaleTime = now + 10 minutes;
        isFirstTime = false;
    } */

    function buyToken(uint256 count) external payable
    {
        require(
            isClosedCrowdsale() == false,
            "vipPaw: Crowdsale is closed"
        );

        address sender = _msgSender();
        uint256 rawAmount = msg.value;

        require(
            count > 0 && count <= maxSupply.sub(lastTokenId),
            "vipPaw: Wrong amount of tokens to purchase"
        );
        require(
            rawAmount == tokenPrice.mul(count),
            "vipPaw: Wrong amount of money"
        );

        uint256 cashbackAmount = tokenPrice.mul(percentOfCashback).div(1000);
        for(uint256 token = 0; token < count; token = token.add(1))
        {
            // mint token
            _mint(sender, lastTokenId);
            // add info about cashback
            cashbackOfToken[lastTokenId] = cashbackAmount;

            lastTokenId = lastTokenId.add(1);
        }

        moneyForCashback = moneyForCashback.add(cashbackAmount.mul(count));
        moneyCollectedAll = moneyCollectedAll.add(rawAmount);
        withdrawForUserWhenRefund[sender] = withdrawForUserWhenRefund[sender].add(rawAmount);

        emit TokensPurchased(sender, count, now);
    }

    function withdraw() external
    {
        require(
            isClosedCrowdsale() == true,
            "vipPaw: Crowdsale is not closed"
        );
        address payable sender = _msgSender();
        if (isRefund())
        {
            uint256 len = balanceOf(sender);
            require(
                len > 0,
                "vipPaw: Need to have vip paw cards to refund"
            );
            uint256 amountToRefund;
            uint256 amountToRefundAll;
            uint256 maxCashbackAmout = tokenPrice.mul(percentOfCashback).div(1000);
            uint256 tokenId;
            for(uint256 ind = 0; ind < len; ind = ind.add(1))
            {
                tokenId = tokenOfOwnerByIndex(sender, 0);
                amountToRefund = tokenPrice.sub(maxCashbackAmout).add(cashbackOfToken[tokenId]);
                amountToRefundAll = amountToRefundAll.add(amountToRefund);

                moneyCollectedAll = moneyCollectedAll.sub(amountToRefund);
                moneyForCashback = moneyForCashback.sub(cashbackOfToken[tokenId]);


                cashbackOfToken[tokenId] = 0;

                _burn(tokenId);
            }

            sender.transfer(amountToRefundAll);
            withdrawForUserWhenRefund[sender] = withdrawForUserWhenRefund[sender].sub(amountToRefundAll);
        }
        else
        {
            require(
                sender == owner(),
                "vipPaw: Sender must be owner of the contract"
            );
            uint256 amountToReturn = moneyCollectedAll.sub(moneyForCashback);
            require(
                amountToReturn > 0,
                "vipPaw: Nothing to return"
            );
            sender.transfer(amountToReturn);
            moneyCollectedAll = moneyForCashback;
        }
    }

    function getCashback(uint256 tokenId) external
    {
        uint256 amount = cashbackOfToken[tokenId];
        require(
            amount > 0,
            "vipPaw: There is no cashback on this token id"
        );
        address payable ownerToken = payable(ownerOf(tokenId));
        ownerToken.transfer(amount);
        withdrawForUserWhenRefund[ownerToken] = withdrawForUserWhenRefund[ownerToken].sub(amount);
        cashbackOfToken[tokenId] = 0;
        moneyCollectedAll = moneyCollectedAll.sub(amount);
        moneyForCashback = moneyForCashback.sub(amount);
    }

    function isClosedCrowdsale() public view returns(bool)
    {
        if (now < openCrowdsaleTime)
            return true;
        else if (now < closeCrowdsaleTime)
        {
            if (lastTokenId >= maxSupply)
                return true;
            else
                return false;
        }
        else
            return true;
    }

    function isRefund() public view returns(bool)
    {
        if (now < openCrowdsaleTime)
            return false;
        else if (now < closeCrowdsaleTime)
        {
            require(
                lastTokenId >= maxSupply,
                "vipPaw: Crowdsale is not ended"
            );
            return false;
        }
        else
        {
            if (lastTokenId >= softCapInTokens)
                return false;
            else
                return true;
        }
    }
}