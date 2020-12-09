import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector, useDispatch } from 'react-redux';
import BigNumber from "bignumber.js"

import { userActions } from '../../redux/actions';
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

    const { binanceService, contractService } = useContractContext()

    const [isTabActive, setIsTabActive] = React.useState(false);
    const [isCounterActive, setCounterActive] = React.useState(false);
    const [isSlidesActive, setSlidesActive] = React.useState(false);
    const [pawCardAmount, setPawCardAmount] = React.useState('');
    const [swipe, setSwipe] = React.useState(false);

    const [isCrowdsaleClosed, setCrowdsaleClosed] = React.useState(false)

    const [cardPrice, setCardPrice] = React.useState(0)


    const pawCardRef = useRef();

    let count = 4;

    const reload = () => {
        window.location.reload();
    };

    const up = () => {
        document.documentElement.scrollTop = 0;
    };

    const handleLogin = () => {
        binanceService.getAccount()
            .then(res => dispatch(userActions.setUserData(res)))
            .catch(err => dispatch(userActions.setUserData(err)))
    };

    const userAddress = useSelector(({ user }) => user.address);

    const outsidePawCardClick = (e) => {
        const path = e.path || (e.composedPath && e.composedPath())
        if (!path.includes(pawCardRef.current)) {
            setCounterActive(false)
        }
    }

    const handleCountCardsChange = (amount) => {
        if (pawCardAmount + amount <= 0) {
            setPawCardAmount(0)
        } else {
            setPawCardAmount(+pawCardAmount + amount)
        }
    }

    const getData = async () => {
        const isClosed = await contractService.isClosedCrowdsale()
        setCrowdsaleClosed(isClosed)

        if (!isClosed) {
            const price = await contractService.tokenPrice()

            setCardPrice(price)
        }
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
                    <div className="header__right">
                        {!userAddress && <button className="header__right-login-button" onClick={handleLogin}>
                            <img src={login_img} />
                            <div>Login to Binance Smart Chain Wallet</div>
                        </button>}
                        <button className="header__right-login-1-button">
                            <img src={trust_img} />
                            <div>Trust Wallet</div>
                        </button>
                        {!isSlidesActive ? (<button className="header__right-nftCard-button" onClick={() => {
                            setSlidesActive(!isSlidesActive)
                        }}>
                            <div> My VIP NFT CARD </div>
                            <div className="count-component">
                                <div className="count-value">
                                    {count}
                                </div>
                            </div>
                        </button>) :
                            (<button className="header__right-nftCard-button-active" onClick={() => {
                                setSlidesActive(!isSlidesActive)
                            }}>
                                <div> My VIP NFT CARD </div>
                                <div className="count-component-active">
                                    <div className="count-value">
                                        {count}
                                    </div>
                                </div>
                                <div className="header__right-nftCard-button-active-img" />
                            </button>)}


                        <div className="header__right-pawCard-wrapper" ref={pawCardRef}>
                            <button className="header__right-pawCard-button" onClick={() => setCounterActive(!isCounterActive)}>
                                BUY VIP PAW CARD

                                {isCounterActive ? (
                                    <div className="pawCard-count-component-up" />
                                ) :
                                    (<div className="pawCard-count-component-down" />)}

                            </button>
                            {isCounterActive ? (<div className="header__right-pawCard-panel" id="pawCard-panel">
                                <div className="header__right-pawCard-panel-counter">
                                    <button onClick={() => handleCountCardsChange(-1)}></button>
                                    <div className="header__right-pawCard-panel-value">
                                        <input placeholder="0" type="number" value={pawCardAmount} onChange={({ target }) => setPawCardAmount(target.value)} />
                                    </div>
                                    <button onClick={() => handleCountCardsChange(1)}></button>
                                </div>
                                <div className="header__right-pawCard-panel-cost">
                                    {cardPrice && pawCardAmount ? new BigNumber(cardPrice).multipliedBy(pawCardAmount).toFixed() : 0} BNB
                                </div>
                                <button className="header__right-pawCard-panel-buy-button">BUY CARD</button>
                            </div>) : (null)}
                        </div>

                    </div>
                    {isSlidesActive ? (
                        <div className="header__swiper" id="swiper">
                            <Swiper
                                spaceBetween={30}
                                slidesPerView={1}

                                onSwiper={swiper => setSwipe(swiper)}
                            //onSlideChangeTransitionEnd={handleSlideChange}

                            >
                                <SwiperSlide>
                                    <div className="swiper-slide-data">
                                        <div className="swiper-slide-value">
                                            count 1
                                        </div>
                                        <button className="swiper-slide-button">
                                            WITH DRAW
                                        </button>
                                        <div className="swiper-slide-id">
                                            #1
                                        </div>
                                    </div>
                                    <div className="swiper-slide-data">
                                        <div className="swiper-slide-value">
                                            count 2
                                        </div>
                                        <button className="swiper-slide-button">
                                            WITH DRAW
                                        </button>
                                        <div className="swiper-slide-id">
                                            #2
                                        </div>
                                    </div>
                                    <div className="swiper-slide-data">
                                        <div className="swiper-slide-value">
                                            count 3
                                        </div>
                                        <button className="swiper-slide-button">
                                            WITH DRAW
                                        </button>
                                        <div className="swiper-slide-id">
                                            #3
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="swiper-slide-data">
                                        <div className="swiper-slide-value">
                                            count 4
                                        </div>
                                        <button className="swiper-slide-button">
                                            WITH DRAW
                                        </button>
                                        <div className="swiper-slide-id">
                                            #4
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="swiper-slide-data">
                                        <div className="swiper-slide-value">
                                            count 2
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <div className="media__btn media__btn--prev" onClick={() => swipe.slidePrev()}>
                                    <img src={arrowPrevImg} alt="" />
                                </div>
                                <div className="media__btn media__btn--next" onClick={() => swipe.slideNext()}>
                                    <img src={arrowNextImg} alt="" />
                                </div>
                            </Swiper>



                        </div>) : null}

                </div>
            </div>
        </div>
    );
}

export default Header;
