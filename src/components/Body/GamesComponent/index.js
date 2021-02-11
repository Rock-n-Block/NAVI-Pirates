import React from "react";

import './games.scss';

import bearLogo from '../../../assets/img/main-logo.svg'

function GamesComponent() {
  return (
      <section className="games-section">
        <div className="container">
          <div className="games-section__content">
            <div className="games-section__title">Games <br/> and Gains</div>
            <div className="games-section__logo">
              <img src={bearLogo} alt=""/>
            </div>
            <div className="games-section__text">
              BEAR Games envisions itself to be the biggest DEFI and
              Cryptocurrency gaming platform for online entertainment.
              Bear Games will keep launching multiple blockchain-based games
              to innovate and disrupt itself while offering players several means
              of earning cryptocurrencies, termed “Gains.”
              Bear Games will launch the first Initial NFT Offering (INO)
              on Ethereum Chain to fund its first Defi Game called  BEAR NAVY Vs. Pirates (BVP).
            </div>
          </div>
          <div className="games-section__buttons">
            <a
            className="button-document"
            href="https://bit.ly/3td59Ym"
            target="_blank"
            >
              <img
              src={require('../../../assets/img/google-docs.svg').default}
              alt=""
              className="button-document-image"
              />
              Audit
            </a>
            <a
            className="button-document"
            href="https://bit.ly/372GAUB"
            target="_blank"
            >
              <img
              src={require('../../../assets/img/google-docs.svg').default}
              alt=""
              className="button-document-image"
              />
              Whitepaper
            </a>
            <a
            className="button-document"
            href="https://bit.ly/3oFi69H"
            target="_blank"
            >
              <img
              src={require('../../../assets/img/google-docs.svg').default}
              alt=""
              className="button-document-image"
              />
              Tokenmetrics
            </a>
          </div>
        </div>
      </section>
  );
}

export default GamesComponent;
