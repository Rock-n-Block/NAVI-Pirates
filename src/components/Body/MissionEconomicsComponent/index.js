import './missioneconomics.scss';
import React from "react";

function RegPAWCardComponent() {
  return (
      <div className = "mission-economics">
      <div className = "row">
          <div className = "mission-economics__content">
              <div className = "mission-economics__content-title">
                  Mission Economics
              </div>
              <div className = "mission-economics__content-body">
              <div className = "mission-economics__content-body-frame">
                  <div className = "mission-economics__content-body-frame-text">
                  1/4 of BNB entering each of the four field bay is paid to the Injury Insurance Pool
                  (displayed as a wound lottery jackpot on the wounded PAW Operative ship card) for that field bay.
                  In comparison, 3/4 of BNB entering each of the four field bay is paid to the Divs Payout Pool for
                  that field bay.
                  </div>
              </div>
              <div className = "mission-economics__content-body-frame">
                  <div className = "mission-economics__content-body-frame-text">
                      <span className="mission-economics__content-body-frame-text-special">
                      BNB in the Divs Payout Pool is distributed as follows;
                      </span>
                  </div>
                      <div className = "mission-economics__content-body-frame-text">
                      <div className = "mission-economics__content-body-frame-text-component">
                          <div className = "mission-economics__content-body-frame-text-component-percents">
                              60%
                          </div>
                          <div className = "mission-economics__content-body-frame-text-component-info">
                              used to mint GOLD tokens to provide liquidity PanCakeSWap at the current price.
                          </div>
                      </div>
                      <div className = "mission-economics__content-body-frame-text-component">
                          <div className = "mission-economics__content-body-frame-text-component-percents">
                              20%
                          </div>
                          <div className = "mission-economics__content-body-frame-text-component-info">
                              used to buyback GOLD tokens (BEAR NAVY salvaging) on PanCakeSwap.
                          </div>
                      </div>
                      <div className = "mission-economics__content-body-frame-text-component">
                          <div className = "mission-economics__content-body-frame-text-component-percents">
                              3%
                          </div>
                          <div className = "mission-economics__content-body-frame-text-component-info">
                              is sent to the Ecosystem Fund address used for platform operational cost.
                          </div>
                      </div>
                      <div className = "mission-economics__content-body-frame-text-component">
                          <div className = "mission-economics__content-body-frame-text-component-percents">
                              10%
                          </div>
                          <div className = "mission-economics__content-body-frame-text-component-info">
                              is paid in BNB proportionately to PAW VIP CARD holders issued in the INO.
                          </div>
                      </div>
                      <div className = "mission-economics__content-body-frame-text-component">
                          <div className = "mission-economics__content-body-frame-text-component-percents">
                              5%
                          </div>
                          <div className = "mission-economics__content-body-frame-text-component-info">
                              is paid to the Founding team, auto buys GOLD tokens for them.
                          </div>
                      </div>
                      <div className = "mission-economics__content-body-frame-text-component">
                          <div className = "mission-economics__content-body-frame-text-component-percents">
                              1%
                          </div>
                          <div className = "mission-economics__content-body-frame-text-component-info">
                              is used to fund the referral fee for the referral program.
                          </div>
                      </div>
                      <div className = "mission-economics__content-body-frame-text-component">
                          <div className = "mission-economics__content-body-frame-text-component-percents">
                              1%
                          </div>
                          <div className = "mission-economics__content-body-frame-text-component-info">is used to fund a marketing partner.
                          </div>
                      </div>
                  </div>
              </div>

              </div>

      </div>
      </div>
      </div>
  );
}

export default RegPAWCardComponent;
