import React from "react";
import {Scrollbars} from "react-custom-scrollbars";

import './missioneconomics.scss';


import addCard from '../../../assets/img/AddCard.png'
import bubbles from '../../../assets/img/bubbles.png'
import me1 from '../../../assets/img/me-1.png'
import me2 from '../../../assets/img/me-2.png'

function RegPAWCardComponent() {

    const elements = () => {
        return <><div className = "mission-economics__right-content-body-frame">
            <div className = "mission-economics__right-content-body-frame-text">
                1/4 of BNB entering each of the four field bay is paid to the Injury Insurance Pool
                (displayed as a wound lottery jackpot on the wounded PAW Operative ship card) for that field bay.
                In comparison, 3/4 of BNB entering each of the four field bay is paid to the Divs Payout Pool for
                that field bay.
            </div>
        </div>
        <div className = "mission-economics__right-content-body-frame">
            <div className = "mission-economics__right-content-body-frame-text">
                      <span className="mission-economics__right-content-body-frame-text-special">
                      BNB in the Divs Payout Pool is distributed as follows;
                      </span>
            </div>
            <div className = "mission-economics__right-content-body-frame-text">
                <div className = "mission-economics__right-content-body-frame-text-component">
                    <div className = "mission-economics__right-content-body-frame-text-component-percents">
                        60%
                    </div>
                    <div className = "mission-economics__right-content-body-frame-text-component-info">
                        used to mint GOLD tokens to provide liquidity PanCakeSWap at the current price.
                    </div>
                </div>
                <div className = "mission-economics__right-content-body-frame-text-component">
                    <div className = "mission-economics__right-content-body-frame-text-component-percents">
                        20%
                    </div>
                    <div className = "mission-economics__right-content-body-frame-text-component-info">
                        used to buyback GOLD tokens (BEAR NAVY salvaging) on PanCakeSwap.
                    </div>
                </div>
                <div className = "mission-economics__right-content-body-frame-text-component">
                    <div className = "mission-economics__right-content-body-frame-text-component-percents">
                        3%
                    </div>
                    <div className = "mission-economics__right-content-body-frame-text-component-info">
                        is sent to the Ecosystem Fund address used for platform operational cost.
                    </div>
                </div>
                <div className = "mission-economics__right-content-body-frame-text-component">
                    <div className = "mission-economics__right-content-body-frame-text-component-percents">
                        10%
                    </div>
                    <div className = "mission-economics__right-content-body-frame-text-component-info">
                        is paid in BNB proportionately to PAW VIP CARD holders issued in the INO.
                    </div>
                </div>
                <div className = "mission-economics__right-content-body-frame-text-component">
                    <div className = "mission-economics__right-content-body-frame-text-component-percents">
                        5%
                    </div>
                    <div className = "mission-economics__right-content-body-frame-text-component-info">
                        is paid to the Founding team, auto buys GOLD tokens for them.
                    </div>
                </div>
                <div className = "mission-economics__right-content-body-frame-text-component">
                    <div className = "mission-economics__right-content-body-frame-text-component-percents">
                        1%
                    </div>
                    <div className = "mission-economics__right-content-body-frame-text-component-info">
                        is used to fund the referral fee for the referral program.
                    </div>
                </div>
                <div className = "mission-economics__right-content-body-frame-text-component">
                    <div className = "mission-economics__right-content-body-frame-text-component-percents">
                        1%
                    </div>
                    <div className = "mission-economics__right-content-body-frame-text-component-info">is used to fund a marketing partner.
                    </div>
                </div>
            </div>
        </div>
        </>
    };

  return (
      <div className = "mission-economics">
      <div className = "row">
          <div className = "mission-economics__content">
              <div className = "mission-economics__left-content">
                  <div className = "mission-economics__left-content-img">
                      <img src={addCard} alt=""/>
                  </div>
              </div>
              <div className = "mission-economics__right-content">
                  <img className="mission-economics__right-content-bubbles" src={bubbles} alt=""/>
              <div className = "mission-economics__right-content-title">
                  Mission Economics
              </div>
                  <div className = "mission-economics__middle-content">
                      <div className = "mission-economics__middle-content-img">
                          <img className = "mission-economics__middle-content-img-1" src={me1} alt=""/>
                          <img className = "mission-economics__middle-content-img-2" src={me2} alt=""/>
                          <img className = "mission-economics__middle-content-img-3" src={addCard} alt=""/>
                      </div>
                  </div>
              <div className = "mission-economics__right-content-body">
                  { window.innerWidth > 999 ?
                      (<Scrollbars style={{ width:450,  height: 512 }}>
                              {elements()}
                          </Scrollbars>
                      ):
                      (elements())}
              </div>

      </div>
      </div>
      </div>
      </div>
  );
}

export default RegPAWCardComponent;
