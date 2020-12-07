import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector, useDispatch } from 'react-redux';

import { userActions } from '../../redux/actions';

import 'swiper/swiper.scss';
import './header.scss';


import logo from '../../assets/img/logo.svg'
import tab from '../../assets/img/tab.png'
import login_img from '../../assets/img/login_image.png'
import trust_img from '../../assets/img/trust.png'
import arrowPrevImg from '../../assets/img/prev.png'
import arrowNextImg from '../../assets/img/next.png'

function Header({ binanceService }) {
    const dispatch = useDispatch()

    const [isTabActive, setIsTabActive] = React.useState(false);
    const [isSlidesActive, setSlidesActive] = React.useState(false);


    const ref = useRef(null);

    const goNext = () => {
        if (ref.current !== null && ref.current.swiper !== null) {
            ref.current.swiper.slideNext();
        }
    };

    const goPrev = () => {
        if (ref.current !== null && ref.current.swiper !== null) {
            ref.current.swiper.slidePrev();
        }
    };

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
    }

    const userAddress = useSelector(({ user }) => user.address)

    //hook for function
    React.useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 1200) {
                setIsTabActive(true)
            } else {
                setIsTabActive(false)
            }
        });
    }, []);

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

                        <button className="header__right-nftCard-button" onClick={() => {
                            setSlidesActive(!isSlidesActive)
                        }}>
                            <div> My VIP NFT CARD </div>
                            <div className="count-component">
                                <div className="count-value">
                                    {count}
                                </div>
                            </div>
                        </button>
                        <button className="header__right-pawCard-button">
                            BUY VIP PAW CARD
                        <div className="pawCard-count-component-down" onClick={() => {
                                document.getElementById("pawCard-panel").style.display = "block";
                                document.getElementsByClassName("pawCard-count-component-up")[0].style.display = "block";
                                document.getElementsByClassName("pawCard-count-component-down")[0].style.display = "none"

                            }}>
                            </div>
                            <div className="pawCard-count-component-up" onClick={() => {
                                document.getElementById("pawCard-panel").style.display = "";
                                document.getElementsByClassName("pawCard-count-component-down")[0].style.display = "block";
                                document.getElementsByClassName("pawCard-count-component-up")[0].style.display = "none";
                            }}>
                            </div>
                        </button>
                        <div className="header__right-pawCard-panel" id="pawCard-panel">
                            <div className="header__right-pawCard-panel-counter">
                                <button>-</button>
                                <div className="header__right-pawCard-panel-value">
                                    20
                            </div>
                                <button>+</button>
                            </div>
                            <div className="header__right-pawCard-panel-cost">
                                $ 200
                        </div>
                            <button className="header__right-pawCard-panel-buy-button">BUY CARD</button>
                        </div>
                    </div>
                    {isSlidesActive ? (
                        <div className="header__swiper" id="swiper">
                            <Swiper
                                spaceBetween={30}
                                slidesPerView={1}
                            // effect="fade"
                            //   onSwiper={swiper => setSwiper(swiper)}
                            //onSlideChangeTransitionEnd={handleSlideChange}

                            >
                                <SwiperSlide>
                                    <div className="swiper-slide-data">
                                        <div className="swiper-slide-value">
                                            count 1
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
                                <SwiperSlide>
                                    <div className="swiper-slide-data">
                                        <div className="swiper-slide-value">
                                            count 3
                                    </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>

                            <div className="media__btn media__btn--prev" onClick={() => goPrev()}>
                                <img src={arrowPrevImg} alt="" />
                            </div>
                            <div className="media__btn media__btn--next" onClick={() => goNext()}>
                                <img src={arrowNextImg} alt="" />
                            </div>

                        </div>) : null}

                </div>
            </div>
        </div>
    );
}

export default Header;
