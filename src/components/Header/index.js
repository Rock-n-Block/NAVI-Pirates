import React from "react";
import { NavLink} from 'react-router-dom';
import './header.scss';

import logo from '../../assets/img/logo.svg'
import login_img from '../../assets/img/login_image.png'
import trust_img from '../../assets/img/trust.png'

function Header() {
    let count = 4;

    return (
    <div className="header">
        <div className = "row">
            <div className = "header__content">
              <div className = "header__left">
                <NavLink to = "/">
                    <img src = {logo} alt = "" />
                </NavLink>
              </div>
                <div className = "header__right">
                   <button className = "header__right-login-button">
                     <img src={login_img}/>
                       <div>Login to Binance Smart Chain Wallet</div>
                   </button>
                    <button className = "header__right-login-1-button">
                        <img src={trust_img}/>
                        <div>Trust Wallet</div>
                    </button>

                    <button className = "header__right-nftCard-button">
                        <div> My VIP NFT CARD </div>
                        <div className = "count-component">
                            <div className = "count-value">
                                {count}
                            </div>
                        </div>
                    </button>
                    <button className = "header__right-pawCard-button">
                        BUY VIP PAW CARD
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Header;
