import React from "react";

import './games.scss';

import bear_games from '../../../assets/img/Group.png'
import big_logo from '../../../assets/img/Group 7108.png'
import middle_logo from '../../../assets/img/Middle Logo.png'

function GamesComponent() {
  return (
      <div className = "games">
      <div className = "row">
          <div className = "games__content">
                  <div className="games__content-title">Games and Gains</div>
                    <div className="games__content-middle-logo">
                        <img src={middle_logo} alt=""/>
                    </div>
                  <div className="games__content-logo">
                      <div className="games__content-logo-img">
                          <img src={big_logo} alt=""/>
                      </div>
                      <div className="games__content-logo-text">
                          <img src={bear_games} alt=""/>
                      </div>
                  </div>
                  <div className="games__content-text">
                      BEAR Games envisions itself to be the biggest DEFI and Cryptocurrency gaming
                      platform for online entertainment. Bear Games will keep launching multiple
                      blockchain-based games to innovate and disrupt itself while offering players several
                      means of earning cryptocurrencies, termed “Gains.” Bear Games will launch the first Initial
                      NFT Offering (INO) on Binance Smart Chain to fund its first Defi Game called  BEAR NAVY Vs.
                      Pirates (BVP).
                  </div>

          </div>
      </div>
      </div>
  );
}

export default GamesComponent;
