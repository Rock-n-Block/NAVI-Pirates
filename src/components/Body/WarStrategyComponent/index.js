import React from "react";

import './warstrategy.scss';
import {Scrollbars} from "react-custom-scrollbars";

import img from '../../../assets/img/WARStrategyGard.png'
import img1 from '../../../assets/img/picture1.png'
import img2 from '../../../assets/img/picture2.png'
import img3 from '../../../assets/img/picture3.png'

function GOLDTokensComponent() {
  return (
      <div className = "war-strategy">
      <div className = "row">

          <div className = "war-strategy__content">
              <div className = "war-strategy__left-content">
                  <img className = "war-strategy__left-content-img-first" src={img1} alt=""/>
                  <img className = "war-strategy__left-content-img-second" src={img2} alt=""/>
                  <img className = "war-strategy__left-content-img-third" src={img3} alt=""/>
              <div className = "war-strategy__left-content-title">
                  War Strategy
              </div>
              <div className = "war-strategy__left-content-body">
                  <Scrollbars style={{ width:450, height: 612 }}>
              <div className = "war-strategy__left-content-body-frame">
                  <div className = "war-strategy__left-content-body-frame-text">
                      The pirates launch four ships to loot tourist yachts of their GOLD tokens treasures
                      in the four field bays; these activities go relatively hindered due to the sea’s sheer
                      size. However, the BEAR Navy has enough PAW Operative ships to prevent pirate ships from
                      returning to land; instead, the BEAR NAVY forces them through a narrow path, where
                      explosive underwater mines lay await.
                  </div>

              </div>
              <div className = "war-strategy__left-content-body-frame">
                  <div className = "war-strategy__left-content-body-frame-text">
                      Frustratingly, every 24 hours, four PAW Operative ships (on a Regular PAW CARD),
                      <span className = "war-strategy__left-content-body-frame-text-special">
                          one from each of the four
                          field bays</span>,
                      get sunk during the war, injuring the PAW
                      Operatives in those ships
                      <span className = "war-strategy__left-content-body-frame-text-special">
                       (called Wound)
                      </span>
                       and sending their chests of GOLD tokens to the
                      ocean floor. Every PAW Operative ships (Regular PAW CARD) with Open Chest in each field
                      bay has an equal chance of being sunken and is eligible for the BEAR NAVY injury insurance
                      for its registered field bay. 1/4 of BNB entering each of the four field bay in 24 hours
                      goes to the Injury Insurance Pool (displayed as a wound lottery jackpot on the wounded PAW
                      Operative ship card) and is paid to the injured PAW Operative for that field bay. 3/4 of
                      BNB entering each of the four field bay goes to the Divs Payout Pool (see Mission Economics).
                  </div>

              </div>
              <div className = "war-strategy__left-content-body-frame">
                  <div className = "war-strategy__left-content-body-frame-text">
                      Meanwhile, the other unwounded PAW Operative ships continue with GOLD tokens salvaging
                      (recovering) from the Pirate ships. As the unwounded PAW Operative ships in each of the
                      four field bay make progress, they release GOLD tokens to all Open Chest on those Regular
                      PAW CARDS associated with their field bay only. The salvaging process occurs continuously
                      over time, and the salvaged GOLD tokens are issued at the rate of 125% of the BNB used to
                      purchase respective Open CHEST (GOLD tokens Bond) on the Regular PAW CARDS. Understandably,
                      the time it takes to recover each full chest of GOLD tokens varies.
                      <span className = "war-strategy__left-content-body-frame-text-special">
                      Veterans should be
                      rest assured that the Bear Navy is committed to the salvaging of every last scrap looted
                      GOLD tokens.
                      </span>
                  </div>

              </div>
                  </Scrollbars>
              </div>
              </div>


              <div className = "war-strategy__right-content">
                  <div className="war-strategy__right-content-img">
                      <img src={img} alt=""/>
                  </div>
              </div>

      </div>
      </div>
      </div>
  );
}

export default GOLDTokensComponent;
