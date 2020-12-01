
import './header.scss';
import { NavLink} from 'react-router-dom';
import logo from '../../assets/img/logo.svg'
import React from "react";
import login_img from '../../assets/img/login_image.png'

function Header() {
    let count = 4;

    return (
    <header>
        <div className = "row">
            <div className = "header__content">
              <div className = "header__left">
                <NavLink to = "/">
                    <img src = {logo} alt = "" />
                </NavLink>
              </div>
                <div className = "header__right">
                   <div className = "header__right-login-button">
                       <div className = "icon"><img src={login_img}/></div>
                       <div className = "text">
                           <NavLink to = "/">Login to Binance Smart Chain Wallet
                           </NavLink>
                       </div>
                   </div>
                    <div className = "header__right-nftCard-button">
                        <div className = "text"> <NavLink to = "/">My VIP NFT CARD</NavLink></div>
                        <div className = "count-component">
                            <div className = "count-value">
                                {count}
                            </div>
                        </div>
                    </div>
                    <div className = "header__right-pawCard-button">
                        <div className="text"><NavLink to = "/">BUY VIP PAW CARD</NavLink></div>
                    </div>
                </div>
            </div>
        </div>
    </header>
  );
}

export default Header;
