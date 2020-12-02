import React from "react";
import {NavLink} from "react-router-dom";

import './footer.scss';

import dribble from '../../assets/img/Dribbble.svg'
import twitter1 from '../../assets/img/Twitter.svg'
import telegram from '../../assets/img/Twitter-1.svg'
import youtube from '../../assets/img/Youtube.svg'


export const dribble_url = "/";
export const twitter_url = "/";
export const telegram_url = "/";
export const youtube_url = "/";

function Footer() {
  return (
    <footer className="footer">
      <div className = "row">
          <div className = "footer__content">
              <div className = "footer__left">
                  <div className = "footer__left-maintenance">Maintained by RocknBlock.io</div>
              </div>
              <div className = "footer__center">
                  <div className = "footer__center-author">© 2020 BEAR Games. All rights reserved</div>
              </div>
              <div className = "footer__right">
                  <div className = "footer__right-contacts">
                      <NavLink to={dribble_url}><img src={dribble} alt=""/></NavLink>
                      <NavLink to={twitter_url}><img src={twitter1} alt=""/></NavLink>
                      <NavLink to={telegram_url}><img src={telegram} alt=""/></NavLink>
                      <NavLink to={youtube_url}><img src={youtube} alt=""/></NavLink>
                  </div>
              </div>
          </div>
      </div>
    </footer>
  );
}

export default Footer;
