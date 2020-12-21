import React from "react";

import './pawauction.scss';
import img from '../../../assets/img/AuctionCard.png'
import img_1 from '../../../assets/img/auction_1.png'
import img_2 from '../../../assets/img/auction_2.png'
import img_3 from '../../../assets/img/auction_3.png'
import img_4 from '../../../assets/img/auction_4.png'


function PAWAuctionComponent() {
  return (
      <section className="section auction-section">
        <div className="container">
          <div className="section__content auction-section__content">
            <div className="section__left-content section__text-content auction-section__left-content">
              <h1 className="section__title auction-section__title">PAW CARD AUCTION Marketplace</h1>

              <div className="section__right-content auction-section__right-content">
                <div className="paw-auction__right-content-img">
                  <img className="paw-auction__right-content-img-main"  src={img} alt=""/>
                  <img className="paw-auction__right-content-img-first" src={img_1} alt=""/>
                  <img className="paw-auction__right-content-img-second" src={img_2} alt=""/>
                  <img className="paw-auction__right-content-img-third" src={img_3} alt=""/>
                  <img className="paw-auction__right-content-img-forth" src={img_4} alt=""/>
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
