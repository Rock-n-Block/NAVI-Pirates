import React from "react";

import './warstrategy.scss';
import {Scrollbars} from "react-custom-scrollbars";

import img from '../../../assets/img/WARStrategyGard.png'
import img1 from '../../../assets/img/picture1.png'
import img2 from '../../../assets/img/picture2.png'
import img3 from '../../../assets/img/picture3.png'

function GOLDTokensComponent() {
    const elements = () => {
        return <>
            <div className="section__text">
                The pirates launch two ships to loot tourist yachts of their GOLD tokens treasures in the two field bays; these activities go relatively unhindered due to the sea’s sheer size. However, the BEAR Navy has enough PAW Operative ships to prevent pirate ships from returning to land; instead, the BEAR NAVY forces them through a narrow path, where explosive underwater mines lay await.
            </div>

            <div className="section__text">
                Frustratingly, every 24 hours, two PAW Operative ships (on a VIP PAW CARD),
                <span className="text-decorator text-decorator--orange">one from each field bay</span>,
                get sunk during the war, injuring the PAW Operatives in those ships (<span className="text-decorator text-decorator--orange">called Wound</span>)
                and sending their chests of GOLD tokens to the ocean floor. Every PAW NFT CARD with Open Chest in each field bay has an equal chance of being sunken
                and is eligible for the BEAR NAVY injury insurance for its registered field bay.
                1/4 of ETH entering each of the four field bay in 24 hours goes to the Injury Insurance Pool
                (displayed as a wound lottery jackpot on the PAW Operative VIP Card) and is paid to the injured PAW Operative for that field bay.
                <span className="text-decorator text-decorator--orange">3/4 of ETH entering each of the four field bay goes to the Divs Payout Pool (see Mission Economics).</span>
            </div>

            <div className="section__text">
                Meanwhile, the other unwounded PAW Operative ships continue with GOLD tokens salvaging (recovering) from the Pirate ships.
                As the unwounded PAW Operative ships in each field bay make progress,
                they release GOLD tokens to all Open Chest on those VIP PAW CARDS associated with their field bay only.
                The salvaging process occurs continuously over time, and the salvaged GOLD tokens are issued at the rate
                of 125% of the ETH used to purchase respective Open CHEST on the VIP PAW CARDS. Understandably,
                the time it takes to recover each full chest of GOLD tokens varies.
                <span className="text-decorator text-decorator--orange">Veterans should be rest assured that the Bear Navy is committed to the salvaging every last scrap looted GOLD tokens.</span>
            </div>
        </>
    };

  return (
      <section className="section strategy-section">
          <div className="container">
              <div className="section__content strategy-section__content">
                  <div className="section__left-content section__text-content strategy-section__left-content">
                      <h1 className="section__title strategy-section__title">War Strategy</h1>

                      <img src={img1} alt="" className="strategy-section__decorator strategy-section__decorator-1"/>
                      <img src={img2} alt="" className="strategy-section__decorator strategy-section__decorator-2"/>
                      <img src={img3} alt="" className="strategy-section__decorator strategy-section__decorator-3"/>

                      <div className="section__right-content strategy-section__right-content">
                          <div className="section__coordinator strategy-section__coordinator">
                            <img src={img} alt="" className="strategy-section__card"/>
                          </div>
                      </div>

                      <div className="section__scroll-content">
                          { window.innerWidth > 1279 ?
                            (<Scrollbars>
                                  {elements()}
                              </Scrollbars>
                            ) :
                            (elements())
                          }
                      </div>
                  </div>
              </div>
          </div>
      </section>
  );
}

export default GOLDTokensComponent;
