import React from "react";

import './bearvsnavy.scss';

import title from '../../../assets/img/title.png'
import ship1 from '../../../assets/img/board1.png'
import ship2 from '../../../assets/img/board2.png'

function BearVSNavyComponent() {
  return (
      <section className="section versus-section">
          <div className="container">
              <div className="versus-section__content">
                  <div className="versus-section__title">
                      <img src={title} alt=""/>
                  </div>

                  <img src={ship1} alt="" className="versus-section__decorator versus-section__decorator-1"/>
                  <img src={ship2} alt="" className="versus-section__decorator versus-section__decorator-2"/>

                  <div className="versus-section__text">
                      BEAR NAVY Vs. Pirates (BVP) gaming smart-contract is an innovative game designed to salvage GOLD tokens for players over-time using <span className="text-decorator text-decorator--blue">125% ROI</span> in ETH value used to play the game. To play the game (move into any of the two field bays), players must own a VIP PAW NFT CARD. Only GOLD tokens salvaged by the BEAR NAVY are distributed to players who own Open CHEST (technically a GOLD token bond) in their VIP PAW CARDS.
                  </div>
              </div>
          </div>
      </section>
  );
}

export default BearVSNavyComponent;
