import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector, useDispatch } from 'react-redux';
import BigNumber from "bignumber.js";
import TokenCardComponent from './TokenCardComponent';

import {userActions, walletActions} from '../../redux/actions';
import { useContractContext } from '../../contexts/contractContext';

import 'swiper/swiper.scss';
import './header.scss';


import logo from '../../assets/img/logo.svg'
import tab from '../../assets/img/tab.png'
import login_img from '../../assets/img/login_image.png'
import trust_img from '../../assets/img/trust.png'
import arrowPrevImg from '../../assets/img/prev.png'
import arrowNextImg from '../../assets/img/next.png'

function Header() {
    const dispatch = useDispatch();

    const { walletService, contractService } = useContractContext()

    const [isTabActive, setIsTabActive] = React.useState(false);
    const [isCounterActive, setCounterActive] = React.useState(false);
    const [isSlidesActive, setSlidesActive] = React.useState(false);
    const [pawCardAmount, setPawCardAmount] = React.useState(0);
    const [swipe, setSwipe] = React.useState(false);
    const [isCrowdsaleClosed, setCrowdsaleClosed] = React.useState(false)
    const [isRefund, setIsRefund] = React.useState(false)
    const [withdrawForUserWhenRefund, setWithdrawForUserWhenRefund] = React.useState(0)
    const [cardPrice, setCardPrice] = React.useState(0)
    const [balance, setBalance] = React.useState(0)

    const pawCardRef = useRef();

    const reload = () => {
        window.location.reload();
    };

    const up = () => {
        document.documentElement.scrollTop = 0;
    };

    const handleLoginBinance = () => {
        try {
            dispatch(walletActions.setWalletType({type:'binance'}))
        } catch (e) {
            console.error(e);
        }
    };

    const handleLoginMetamask = () => {
        try {
            dispatch(walletActions.setWalletType({type:'metamask'}))
        } catch (e) {
            console.error(e);
        }
    };

    const userAddress = useSelector(({ user }) => user.address);

    const outsidePawCardClick = (e) => {
        const path = e.path || (e.composedPath && e.composedPath())
        if (!path.includes(pawCardRef.current)) {
            setCounterActive(false)
        }
    }

    const handleCountCardsChange = (amount) => {
        const newAmount = +pawCardAmount + amount;
        if (newAmount <= 0) {
            setPawCardAmount(0)
        } else {
            if (isCrowdsaleClosed && isRefund) {
                if (newAmount > withdrawForUserWhenRefund) return;
            } else {
                setPawCardAmount(newAmount)
            }
        }
    }

    const handleBuyToken = async () => {
        try {
            const bought = await contractService.buyManyTokens(userAddress,pawCardAmount)
            const balanceOf = await contractService.balanceOf(userAddress)
            setBalance(balanceOf)
        } catch (e) {
            console.error(e);
        }
    }

    const handleRefund = async () => {
        try {
            const burn = await contractService.burnTokensToRefund(userAddress,pawCardAmount)
            console.log('handleRefund isRefund',isRefund)
            console.log('handleRefund burn',burn)
            const balanceOf = await contractService.balanceOf(userAddress)
            setBalance(balanceOf)
        } catch (e) {
            console.error(e);
        }
    }

    const getData = async () => {
        if (userAddress) {
            const count = await contractService.withdrawForUserWhenRefund(userAddress)
            setWithdrawForUserWhenRefund(count)
        }
        const isRefund = await contractService.isRefund()
        setIsRefund(isRefund)
        const isClosed = await contractService.isClosedCrowdsale()
        setCrowdsaleClosed(isClosed)
        if (!isClosed) {
            const price = await contractService.tokenPrice()
            setCardPrice(price)
        }
    }

    const getBalance = async () => {
        const balanceOf = await contractService.balanceOf(userAddress)
        setBalance(balanceOf)
    }

    React.useEffect(() => {
        document.body.addEventListener('click', outsidePawCardClick)
        return () => {
            document.body.removeEventListener('click', outsidePawCardClick)
        };
    }, []);

    React.useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 1200) {
                setIsTabActive(true)
            } else {
                setIsTabActive(false)
            }
        });
    }, []);

    React.useEffect(() => {
        if (contractService) {
            getData()
        }
    }, [contractService])

    React.useEffect(() => {
        if (userAddress) {
            getBalance()
        }
    }, [userAddress])

    return (
        <div className="header">
            <div className="row">
                <div className="header__content">
                    <div className="header__left">
                        <NavLink to="/">
                            <img src={logo} alt="" onClick={reload} />
                            {isTabActive ? (
                                <img className="tab" src={tab} alt="" onClick={up} />
                            ) :
                                (null)}
                        </NavLink>

                    </div>
                    <div
                    className="header__right">

                        {!userAddress &&
                        <button
                        className="header__right-login-button"
                        onClick={handleLoginBinance}
                        >
                            <img src={login_img} />
                            <div>Login to Binance</div>
                        </button>
                        }

                        {!userAddress &&
                        <button
                        className="header__right-login-button"
                        onClick={handleLoginMetamask}
                        >
                            <img src={trust_img}/>
                            <div>Login to Metamask</div>
                        </button>
                        }

                        {!isSlidesActive ? (
                        <button
                        className="header__right-nftCard-button"
                        onClick={() => {
                            setSlidesActive(!isSlidesActive)
                        }}
                        >
                            <div> My VIP NFT CARD </div>
                            <div className="count-component">
                                <div className="count-value">
                                    {balance}
                                </div>
                            </div>
                        </button>
                        ) : (
                        <button
                        className="header__right-nftCard-button-active"
                        onClick={() => {
                            setSlidesActive(!isSlidesActive)
                        }}
                        >
                            <div> My VIP NFT CARD </div>
                            <div className="count-component-active">
                                <div className="count-value">
                                    {balance}
                                </div>
                            </div>
                            <div className="header__right-nftCard-button-active-img" />
                        </button>
                        )}

                        <div className="header__right-pawCard-wrapper" ref={pawCardRef}>
                            <button
                            className="header__right-pawCard-button"
                            onClick={() => setCounterActive(!isCounterActive)}
                            >
                                {isCrowdsaleClosed && isRefund ?
                                'WITHDRAW' : 'BUY VIP PAW CARD'
                                }

                                {isCounterActive ? (
                                <div className="pawCard-count-component-up" />
                                ) : (
                                <div className="pawCard-count-component-down" />
                                )}

                            </button>
                            {isCounterActive ?
                            (<div className="header__right-pawCard-panel" id="pawCard-panel">
                                <div className="header__right-pawCard-panel-counter">
                                    <button onClick={() => handleCountCardsChange(-1)}></button>
                                    <div className="header__right-pawCard-panel-value">
                                        <input
                                        placeholder="0"
                                        type="number"
                                        value={pawCardAmount}
                                        onChange={({ target }) => setPawCardAmount(target.value)}
                                        />
                                    </div>
                                    <button onClick={() => handleCountCardsChange(1)}></button>
                                </div>
                                <div
                                className="header__right-pawCard-panel-cost"
                                >
                                    {cardPrice && pawCardAmount ?
                                    new BigNumber(cardPrice).multipliedBy(pawCardAmount).toFixed() :
                                    0
                                    } BNB
                                </div>
                                { isCrowdsaleClosed && isRefund ?
                                <button
                                className="header__right-pawCard-panel-buy-button"
                                onClick={handleRefund}>
                                    REFUND
                                </button>:
                                <button
                                className="header__right-pawCard-panel-buy-button"
                                onClick={handleBuyToken}>
                                    BUY CARD
                                </button>
                                }
                            </div>) :
                            (null)
                            }
                        </div>

                    </div>
                    {isSlidesActive ? (
                        <div className="header__swiper" id="swiper">
                            { balance !== 0 ?
                            <Swiper
                            spaceBetween={10}
                            slidesPerView={2}
                            onSwiper={swiper => setSwipe(swiper)}
                            //onSlideChangeTransitionEnd={handleSlideChange}
                            >
                                {[...new Array(balance)].map((token,it) => {
                                    const index = it + 1;
                                    return (
                                    <SwiperSlide
                                    key={`token-${index}`}
                                    >
                                        <TokenCardComponent
                                        index={index}
                                        />
                                    </SwiperSlide>
                                    )
                                })}
                                <div className="media__btn media__btn--prev" onClick={() => swipe.slidePrev()}>
                                    <img src={arrowPrevImg} alt="" />
                                </div>
                                <div className="media__btn media__btn--next" onClick={() => swipe.slideNext()}>
                                    <img src={arrowNextImg} alt="" />
                                </div>
                            </Swiper>
                            :
                            <div className="swiper-empty">
                                nothing yet
                            </div>
                            }
                        </div>) : null}

                </div>
            </div>
        </div>
    );
}

export default Header;
