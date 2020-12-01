import './offering.scss';
import React from "react";
import bear from '../../../assets/img/bear.png'

function OfferingComponent() {
  return (
      <div className = "nft-offering">
      <div className = "row">
          <div className = "nft-offering__content">
          <div className="nft-offering__content-body">
              <div className="nft-offering__content-body-left">
                  <div className="nft-offering__content-body-left-text">
                      Each VIP PAW CARD is designed the same, and they display
                      a Bear Navy PAW Captain with a unique character set. Bear
                      Games will create 10000 VIP PAW NFT CARDS available for sale
                      during the Initial NFT Offering (INO) on BEAR GAMES official
                      website.
                  </div>
              </div>
              <div className="nft-offering__content-body-left">
                  <div className="nft-offering__content-body-left-text">
                      <span className="nft-offering__content-body-left-text-special">
                      Each VIP PAW CARD cost 0.5 BNB. The Initial NFT Offering has a hard cap of 5000 BNB
                      and a soft cap of 2000 BNB.
                      </span>
                  </div>
              </div>

              <div className="nft-offering__content-body-right">
                  <div className="nft-offering__content-body-right-text">
                      Bear Games Initial NFT Offering issues VIP PAW NFT
                      CARDS at rate
                      <span className="nft-offering__content-body-bottom-text-special">
                      1:0.5
                      </span>
                      BNB to fund Bear Navy Vs. Pirates
                      Game to interested participants. Bear Games will
                      create
                      <span className="nft-offering__content-body-bottom-text-special">
                          10000 VIP PAW CARDS
                      </span>
                      available for sale during
                      the Initial NFT Offering (INO) with the same design
                      and auctionable (sellable) on the launch of the Bear
                      Navy Vs. Pirates (BVP) platform launch. All funds
                      raised, minus a 1% public dev fee (their charge for
                      being public during Initial NFT Offering), will be
                      utilized to develop and market the platform
                      transparently.
                  </div>
              </div>
          <div className="nft-offering__content-body-bottom">
              <div className="nft-offering__content-body-bottom-text">
                    <span className="nft-offering__content-body-bottom-text-special">
                  VIP PAW CARD holders will be able to withdraw BNB
                  earned from the 10% of the Divs Payout Pool allocated
                  proportionally to all VIP PAW CARD (see MISSION
                  ECONOMICS above) and BNB percentage profits from
                  future gaming dapps.
                    </span>
              </div>
          </div>
          </div>
      </div>
      </div>
      </div>
  );
}

export default OfferingComponent;
