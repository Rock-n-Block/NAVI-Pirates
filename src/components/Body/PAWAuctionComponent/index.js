import React from "react";

import './pawauction.scss';
import card from '../../../assets/img/paw-card-auction/card.png'
import decorator1 from '../../../assets/img/paw-card-auction/decorator-1.png'
import decorator2 from '../../../assets/img/paw-card-auction/decorator-2.png'
import decorator3 from '../../../assets/img/paw-card-auction/decorator-3.png'
import decorator4 from '../../../assets/img/paw-card-auction/decorator-4.png'


function PAWAuctionComponent() {
  return (
      <section className="section auction-section">
        <div className="container">
          <div className="section__content auction-section__content">
            <div className="section__left-content section__text-content auction-section__left-content">
              <h1 className="section__title auction-section__title">PAW CARD AUCTION Marketplace</h1>

              <div className="section__right-content auction-section__right-content">
                <div className="section__coordinator auction-section__coordinator">
                  <img src={card} alt="" className="auction-section__card"/>
                  <img src={decorator1} alt="" className="auction-section__decorator auction-section__decorator-1"/>
                  <img src={decorator2} alt="" className="auction-section__decorator auction-section__decorator-2"/>
                  <img src={decorator3} alt="" className="auction-section__decorator auction-section__decorator-3"/>
                  <img src={decorator4} alt="" className="auction-section__decorator auction-section__decorator-4"/>
                </div>
              </div>

              <div className="section__scroll-content">
                <div className="section__text">
                  Veterans may choose to auction their VIP PAW CARD to other interested veterans (players) in the CARD AUCTION marketplace at their desired ETH price.
                  <span className="text-decorator text-decorator--blue">The only requirement is that the purchaser MUST prove they are already a Navy registered veteran by presenting an existing VIP PAW CARD or PAW VIP CARD in their possession.</span>
                </div>

                <div className="section__text">
                  <span className="text-decorator text-decorator--blue">VIP PAW CARD holders can also auction their cards in the CARD AUCTION marketplace at their desired ETH price to any interested purchaser without any requirement from the purchaser.</span>
                  There is a 0.5% fee in ETH on all Card auctions collected for a week and distributed as following; 60% goes to minting Gold and locking liquidity for Gold tokens, 30% goes to salvaging GOLD for VIP PAW Card holders and 10% is issued as Divs to existing VIP PAW Card holders.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

export default PAWAuctionComponent;
