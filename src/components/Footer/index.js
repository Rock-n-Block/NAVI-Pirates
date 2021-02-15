import React from "react";

import './footer.scss';

import github from '../../assets/img/socials/Github.svg'
import medium from '../../assets/img/socials/Medium.svg'
import twitter from '../../assets/img/socials/Twitter.svg'
import telegram from '../../assets/img/socials/Telegram.svg'
import youtube from '../../assets/img/socials/Youtube.svg'


export const github_url = "https://github.com/BearDefiGames/BearGamesDefi";
export const medium_url = "https://medium.com/@beargames";
export const twitter_url = "https://twitter.com/BearGamesNFT";
export const telegram_url = "https://t.me/BearGamesChat";
export const youtube_url = "https://www.youtube.com/c/BearGamesOfficial";

function Footer() {
  return (
    <footer className="footer">
      <div className = "container">
          <div className="footer__content">
              <div className="footer__content-col">
                  <div className="footer__copyright">© 2021 BEAR Games. All rights reserved</div>
              </div>
              <div className="footer__content-col">
                  <div className="footer__copyright">Smart contract developed and tested by Rock'n'Block</div>
              </div>
              <div className="footer__content-col">
                  <div className="footer__socials">
                      <a href={github_url} className="footer__socials-item"><img src={github} alt=""/></a>
                      <a href={medium_url} className="footer__socials-item"><img src={medium} alt=""/></a>
                      <a href={twitter_url} className="footer__socials-item"><img src={twitter} alt=""/></a>
                      <a href={telegram_url} className="footer__socials-item"><img src={telegram} alt=""/></a>
                      <a href={youtube_url} className="footer__socials-item"><img src={youtube} alt=""/></a>
                  </div>
              </div>
          </div>
      </div>
    </footer>
  );
}

export default Footer;
