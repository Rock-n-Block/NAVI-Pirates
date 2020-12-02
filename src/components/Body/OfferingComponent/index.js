import React from "react";

import './offering.scss';

import bear from '../../../assets/img/bear.png'
import rectangle from '../../../assets/img/white rectangle.png'
import cap from '../../../assets/img/сap.png'
import first from '../../../assets/img/first.png'
import second from '../../../assets/img/second.png'
import third from '../../../assets/img/third.png'


function OfferingComponent() {
  return (
      <div className = "nft-offering">
      <div className = "row">
          <div className = "nft-offering__content">
              <div className="nft-offering__content-title">
                  Initial NFT Offering
              </div>
          <div className="nft-offering__content-body">
              <div className="nft-offering__content-picture">
                  <img className="nft-offering__content-picture-card" src={bear} alt=""/>
              </div>
              <img className="nft-offering__content-backPicture-first" src={first} alt=""/>
              <img className="nft-offering__content-backPicture-second" src={second} alt=""/>

              <div className="nft-offering__content-body-left">
                  <div className="nft-offering__content-body-left-text">
                      Each VIP PAW CARD is designed the same, and they display
                      a Bear Navy PAW Captain with a unique character set. Bear
                      Games will create 10000 VIP PAW NFT CARDS available for sale
                      during the Initial NFT Offering (INO) on BEAR GAMES official
                      website.
                  </div>
                  <div className="nft-offering__content-body-left-img-1">
                      <img src={rectangle} alt=""/>
                  </div>

              </div>
              <div className="nft-offering__content-body-left">
                  <div className="nft-offering__content-body-left-text">
                      <span className="nft-offering__content-body-left-text-special">
                      EACH VIP PAW CARD COST 0.5 BNB. THE INITIAL NFT OFFERING HAS A HARD CAP OF 5000 BNB
                      AND A SOFT CAP OF 2000 BNB.
                      </span>
                  </div>
                  <div className="nft-offering__content-body-left-img-2">
                      <img src={rectangle} alt=""/>
                  </div>
                  <img className="nft-offering__content-body-left-backPicture" src={third} alt=""/>
              </div>

              <div className="nft-offering__content-body-right">
                  <div className="nft-offering__content-body-right-cap">
                      <img src={cap} alt=""/>
                  </div>
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
                  <div className="nft-offering__content-body-right-img">
                      <img src={rectangle} alt=""/>
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
