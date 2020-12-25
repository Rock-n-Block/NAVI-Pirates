import React from "react";
import {NavLink} from "react-router-dom";

import './footer.scss';

import github from '../../assets/img/socials/Github.svg'
import twitter from '../../assets/img/socials/Twitter.svg'
import telegram from '../../assets/img/socials/Telegram.svg'
import youtube from '../../assets/img/socials/Youtube.svg'


export const github_url = "/";
export const twitter_url = "/";
export const telegram_url = "/";
export const youtube_url = "/";

function Footer() {
  return (
    <footer className="footer">
      <div className = "container">
          <div className="footer__content">
              <div className="footer__content-col">
                  <div className="footer__maintenance">Maintained by RocknBlock.io</div>
              </div>
              <div className="footer__content-col">
                  <div className="footer__copyright">© 2020 BEAR Games. All rights reserved</div>
              </div>
              <div className="footer__content-col">
                  <div className="footer__version">Lite Paper v1.0</div>
                  <div className="footer__socials">
                      <NavLink to={github_url} className="footer__socials-item"><img src={github} alt=""/></NavLink>
                      <NavLink to={twitter_url} className="footer__socials-item"><img src={twitter} alt=""/></NavLink>
                      <NavLink to={telegram_url} className="footer__socials-item"><img src={telegram} alt=""/></NavLink>
                      <NavLink to={youtube_url} className="footer__socials-item"><img src={youtube} alt=""/></NavLink>
                  </div>
              </div>
          </div>
      </div>
    </footer>
  );
}

export default Footer;
