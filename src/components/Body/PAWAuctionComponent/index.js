import React from "react";

import './pawauction.scss';
import img from '../../../assets/img/AuctionCard.png'
import img_1 from '../../../assets/img/auction_1.png'
import img_2 from '../../../assets/img/auction_2.png'
import img_3 from '../../../assets/img/auction_3.png'
import img_4 from '../../../assets/img/auction_4.png'


function PAWAuctionComponent() {
  return (
      <div className = "paw-auction">
      <div className = "row">
          <div className = "paw-auction__content">
              <div className = "paw-auction__left-content">
            <div className = "paw-auction__left-content-title">
                PAW CARD AUCTION Marketplace
            </div>

              <div className = "paw-auction__left-content-body">
                <div className = "paw-auction__left-content-body-frame">
                    <div className = "paw-auction__left-content-body-frame-text">
                        Veterans may choose to auction their Regular PAW CARD to other interested veterans
                        (players) in the CARD AUCTION marketplace at their desired BNB price.
                        The only requirement is that the purchaser MUST prove they are already a Navy
                        registered veteran by presenting an existing Regular PAW CARD or PAW VIP CARD
                        in their possession.
                        <p>
                        VIP PAW CARD holders can also auction their cards in the CARD AUCTION marketplace
                        at their desired BNB price to any interested purchaser without any requirement from
                        the purchaser.
                        </p>
                    </div>
                </div>
            </div>
              </div>
              <div className = "paw-auction__right-content">
                  <div className="paw-auction__right-content-img">
                      <img className="paw-auction__right-content-img-main"  src={img} alt=""/>
                      <img className="paw-auction__right-content-img-first" src={img_1} alt=""/>
                      <img className="paw-auction__right-content-img-second" src={img_2} alt=""/>
                      <img className="paw-auction__right-content-img-third" src={img_3} alt=""/>
                      <img className="paw-auction__right-content-img-forth" src={img_4} alt=""/>
                  </div>
              </div>
      </div>
      </div>
      </div>
  );
}

export default PAWAuctionComponent;
