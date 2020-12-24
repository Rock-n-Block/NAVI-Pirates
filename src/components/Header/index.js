import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import BigNumber from "bignumber.js";
import TokenCardComponent from './TokenCardComponent';

import {userActions, walletActions} from '../../redux/actions';
import { useContractContext } from '../../contexts/contractContext';

import 'swiper/swiper.scss';
import './header.scss';

import trust_img from '../../assets/img/trust.png'
import logo from '../../assets/img/logo.svg'
import scrollUpImg from '../../assets/img/scroll-up.svg'
import metamask_img from '../../assets/img/metamask.svg'
import arrowPrevImg from '../../assets/img/prev.png'
import arrowNextImg from '../../assets/img/next.png'
import github from "../../assets/img/socials/github_header.svg";
import twitter from "../../assets/img/socials/twitter_header.svg";
import telegram from "../../assets/img/socials/telegram_header.svg";
import youtube from "../../assets/img/socials/youtube_header.svg";
import { github_url, telegram_url, twitter_url, youtube_url } from "../Footer";

function Header() {
    const dispatch = useDispatch();

    const { walletService, contractService } = useContractContext()

    const [isMenuActive, setIsMenuActive] = React.useState(false)
    const [isTabActive, setIsTabActive] = React.useState(false);
    const [isCounterActive, setCounterActive] = React.useState(false);
    const [isSlidesActive, setSlidesActive] = React.useState(false);
    const [pawCardAmount, setPawCardAmount] = React.useState(0);
    const [swipe, setSwipe] = React.useState(false);
    const [isCrowdsaleClosed, setCrowdsaleClosed] = React.useState(false)
    const [isRefund, setIsRefund] = React.useState(false)
    const [cardPrice, setCardPrice] = React.useState(0)
    const [balance, setBalance] = React.useState(0)

    const pawCardRef = useRef();
    const sliderRef = useRef();
    const sliderButtonRef = useRef();

    const reload = () => {
        window.location.reload();
    };

    const scrollUp = () => {
        document.documentElement.scrollTop = 0;
    };

    const handleLoginMetamask = async () => {
        try {
            const account = await walletService.getAccount()
            dispatch(userActions.setUserData(account))
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

    const outsideSliderClick = (e) => {
        const path = e.path || (e.composedPath && e.composedPath())
        if (!path.includes(sliderRef.current) && !path.includes(sliderButtonRef.current)) {
            setSlidesActive(false)
        }
    }

    const onMenuBtnClick = () => {
        setSlidesActive(false)
        setIsMenuActive(!isMenuActive)
    }

    const handleCountCardsChange = (amount) => {
        const newAmount = +pawCardAmount + amount;
        if (isCrowdsaleClosed && isRefund && (newAmount > balance)) return;
        if (newAmount <= 0) {
            setPawCardAmount(0)
        } else {
            setPawCardAmount(newAmount)
        }
    }

    const handleCountCardsInput = async ({target}) => {
        const amount = target.value;
        if (isCrowdsaleClosed && isRefund && (+amount > balance)) {
            setPawCardAmount(+balance)
        } else {
            setPawCardAmount(+amount)
        };
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
            const burn = await contractService.refundManyTokens(userAddress,pawCardAmount)
            console.log('handleRefund isRefund',isRefund)
            console.log('handleRefund burn',burn)
            const balanceOf = await contractService.balanceOf(userAddress)
            setBalance(balanceOf)
        } catch (e) {
            console.error(e);
        }
    }

    const getData = async () => {
        try {
            if (userAddress) {
                const isRefund = await contractService.isRefund(userAddress)
                setIsRefund(isRefund)
            }
            const isClosed = await contractService.isClosedCrowdsale()
            setCrowdsaleClosed(isClosed)
            const price = await contractService.tokenPrice()
            setCardPrice(price)
        } catch (e) {
            console.error('Header getData',e);
        }
    }

    const getBalance = async () => {
        const balanceOf = await contractService.balanceOf(userAddress)
        setBalance(balanceOf)
    }

    React.useEffect(() => {
        document.body.addEventListener('click', outsidePawCardClick)
        document.body.addEventListener('click', outsideSliderClick)
        return () => {
            document.body.removeEventListener('click', outsidePawCardClick)
            document.body.removeEventListener('click', outsideSliderClick)
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
    }, [userAddress,contractService])

    React.useEffect(() => {
        if (userAddress) {
            getBalance()
        }
    }, [userAddress])

    return (
        <header className={classNames('header', {
            'menu-shown': isMenuActive
        })}>
            <div className="container">
                <div className="header__content">
                    {isTabActive &&
                        <img className="scroll-up-btn" src={scrollUpImg} alt="" onClick={scrollUp} />
                    }

                    <div className="m-menu-btn-wrapper" onClick={() => onMenuBtnClick()}>
                        <span className="m-menu-btn"></span>
                    </div>

                    <div className="header__logo">
                        <NavLink to="/">
                            <img src={logo} alt="" onClick={reload} />
                        </NavLink>
                    </div>

                    <div className="header__menu m-menu">
                        <div className="header__controls">
                            {!userAddress &&
                            <div
                            className="header__btn header__btn--bg"
                            onClick={handleLoginMetamask}
                            >
                                <img src={trust_img}/>
                                <div>Login to Metamask</div>
                            </div>
                            }

                            <div
                            ref={sliderButtonRef}
                              className={classNames('header__btn header__nft-card-btn', {
                                  'header__nft-card-btn--active': isSlidesActive
                              })}
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
                            </div>

                            <div className="header__paw-card-wrapper" ref={pawCardRef}>
                                <div
                                  className="header__btn header__paw-card-btn"
                                  onClick={() => setCounterActive(!isCounterActive)}
                                >
                                    {isCrowdsaleClosed && isRefund ?
                                      'WITHDRAW' : 'BUY VIP PAW CARD'
                                    }

                                    <div className={classNames('count-component-arrow', {
                                        'count-component-arrow--up': isCounterActive,
                                        'count-component-arrow--down': !isCounterActive
                                    })}/>
                                </div>
                                {isCounterActive &&
                                    <div className="header__paw-card paw-card">
                                    <div className="paw-card__counter">
                                      <div className="paw-card__counter-btn paw-card__counter-btn--minus" onClick={() => handleCountCardsChange(-1)}></div>
                                      <div className="paw-card__counter-value">
                                          <input
                                            placeholder="0"
                                            type="number"
                                            value={pawCardAmount}
                                            onChange={handleCountCardsInput}
                                          />
                                      </div>
                                      <div className="paw-card__counter-btn paw-card__counter-btn--plus" onClick={() => handleCountCardsChange(1)}></div>
                                    </div>
                                    <div
                                    className="paw-card__price"
                                    >
                                      {cardPrice && pawCardAmount ?
                                        new BigNumber(cardPrice).multipliedBy(pawCardAmount).toFixed() :
                                        0
                                      } BNB
                                    </div>
                                    {isCrowdsaleClosed && isRefund ?
                                    <div
                                      className="paw-card__buy-btn"
                                      onClick={handleRefund}>
                                        REFUND
                                    </div> :
                                    <div
                                      className="paw-card__buy-btn"
                                      onClick={handleBuyToken}>
                                        BUY CARD
                                    </div>
                                    }
                                    </div>
                                }
                            </div>
                        </div>

                        <div className="header__menu-footer">
                            <div className="header__maintenance">Maintained by RocknBlock.io</div>
                            <div className="header__copyright">© 2020 BEAR Games. All rights reserved</div>
                            <div className="header__socials">
                                <NavLink to={github_url}><img src={github} alt=""/></NavLink>
                                <NavLink to={twitter_url}><img src={twitter} alt=""/></NavLink>
                                <NavLink to={telegram_url}><img src={telegram} alt=""/></NavLink>
                                <NavLink to={youtube_url}><img src={youtube} alt=""/></NavLink>
                            </div>
                        </div>
                    </div>

                    {isSlidesActive &&
                        <div className="header__swiper" id="swiper" ref={sliderRef}>
                            {balance !== 0 ?
                                <Swiper
                                spaceBetween={0}
                                slidesPerView={2}
                                onSwiper={swiper => setSwipe(swiper)}
                                //onSlideChangeTransitionEnd={handleSlideChange}
                                >
                                    {[...new Array(balance)].map((token, it) => {
                                        const index = it;
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
                                        <img src={arrowPrevImg} alt=""/>
                                    </div>
                                    <div className="media__btn media__btn--next" onClick={() => swipe.slideNext()}>
                                        <img src={arrowNextImg} alt=""/>
                                    </div>
                                </Swiper>
                                :
                                <div className="swiper-empty">
                                    nothing yet
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
        </header>
    );
}

export default Header;
