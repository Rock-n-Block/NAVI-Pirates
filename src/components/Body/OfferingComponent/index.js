import React from "react";

import './offering.scss';

import bearCard from '../../../assets/img/bear-card.png'
import cap from '../../../assets/img/сap.png'
import first from '../../../assets/img/first.png'
import second from '../../../assets/img/second.png'
import third from '../../../assets/img/third.png'


function OfferingComponent() {
  return (
      <section className="section offering-section">
          <div className="container">
              <div className="offering-section__title">Initial NFT Offering</div>

              <div className="offering-section__content">
                  <img src={first} alt="" className="offering-section__decorator offering-section__decorator-1"/>
                  <img src={second} alt="" className="offering-section__decorator offering-section__decorator-2"/>

                  <div className="offering-section__card">
                      <img className="offering-section__card-img" src={bearCard} alt=""/>
                  </div>

                  <div className="offering-section__descr offering-section__descr--left">
                      Each VIP PAW CARD is designed the same, and they display a Bear Navy PAW Captain with a unique character set. Bear Games will create 100,000 VIP PAW NFT CARDS available for sale during the Initial NFT Offering (INO) on BEAR GAMES official website. There are infinite possibilities with what can be stored in the PAW VIP Card in future or distributed to the PAW VIP Cards as divs including ERC20 tokens. All this to increase value!
                  </div>

                  <div className="offering-section__descr offering-section__descr--left">
                      <img src={third} alt="" className="offering-section__decorator offering-section__decorator-3"/>
                      <span className="text-decorator text-decorator--blue">Each VIP PAW CARD cost 0.005 ETH. The Initial NFT Offering has a hard cap of 500 ETH and a soft cap of 300 ETH.</span>
                  </div>

                  <div className="offering-section__descr offering-section__descr--right">
                      <img src={cap} alt="" className="offering-section__decorator offering-section__decorator-cap"/>
                      Bear Games Initial NFT Offering issues VIP PAW NFT CARDS at rate <span className="text-decorator text-decorator--blue">1:0.005 ETH</span> to fund Bear Navy Vs. Pirates Game to interested participants. Bear Games will create 100,000 VIP PAW CARDS available for sale during the Initial NFT Offering (INO) with the same design and auctionable (sellable) on the launch of the Bear Navy Vs. Pirates (BVP) platform launch. All funds raised, minus a 5% public dev fee (their charge for being public during Initial NFT Offering), can utilized to develop and market the platform transparently.
                  </div>

                  <div className="offering-section__descr offering-section__descr--bottom">
                      <span className="text-decorator text-decorator--blue">VIP PAW CARD holders can withdraw ETH earned from the Divs Payout Pool allocated proportionately (see MISSION ECONOMICS above) and ETH percentage profits from future gaming dapps.</span>
                  </div>
              </div>
          </div>
      </section>
  );
}

export default OfferingComponent;
