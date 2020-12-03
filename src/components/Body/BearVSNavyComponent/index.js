import React from "react";

import './bearvsnavy.scss';

import title from '../../../assets/img/title.png'
import board1 from '../../../assets/img/board1.png'
import board2 from '../../../assets/img/board2.png'

function BearVSNavyComponent() {
  return (
      <div className = "bear-vs-navy">
      <div className = "row">
          <div className = "bear-vs-navy__title">
              <img src={title} alt=""/>
          </div>
          <div className = "bear-vs-navy__img-1">
              <img src={board1} alt=""/>
          </div>
          <div className = "bear-vs-navy__img-2">
              <img src={board2} alt=""/>
          </div>
          <div className = "bear-vs-navy__content">
            <div className = "bear-vs-navy__content-text">
                BEAR NAVY Vs. Pirates (BVP) gaming smart-contract is an innovative game designed to mint
                GOLD tokens for players over-time using
                <span className = "bear-vs-navy__content-text-special">
                125% ROI in BNB
                </span>
                value used to play the game.
                To play the game (move into any of the four field bays), players must own a Regular PAW
                NFT CARD issued at a cost. Only GOLD tokens salvaged by the BEAR NAVY are distributed to
                players who own
                <span className="nft-offering__content-body-bottom-text-special">
                    Open CHEST
                </span>
                (technically a GOLD tokens bond) in their Regular PAW CARDS.
            </div>
      </div>
      </div>
      </div>
  );
}

export default BearVSNavyComponent;
