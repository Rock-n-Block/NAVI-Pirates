import './pawauction.scss';
import React from "react";

function PAWAuctionComponent() {
  return (
      <div className = "paw-auction">
      <div className = "row">
          <div className = "paw-auction__content">
            <div className = "paw-auction__content-title">
                PAW CARD AUCTION Marketplace
            </div>
              <div className = "paw-auction__content-body">
                <div className = "paw-auction__content-body-frame">
                    <div className = "paw-auction__content-body-frame-text">
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
      </div>
      </div>
  );
}

export default PAWAuctionComponent;
