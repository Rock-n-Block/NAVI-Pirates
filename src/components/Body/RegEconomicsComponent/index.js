import React from "react";

import './regeconomics.scss';

import img from '../../../assets/img/Paw Card.png'

function RegEconomicsComponent() {
  return (
      <div className = "reg-economics">
      <div className = "row">
          <div className = "reg-economics__content">
              <div className = "reg-economics__content-title">
                  Regular PAW CARD Issuance ECONOMICS
              </div>
              <div className="reg-economics__content-img">
                  <img src={img} alt=""/>
              </div>
              <div className = "reg-economics__content-body">
              <div className = "reg-economics__content-body-frame">
                  <div className = "reg-economics__content-body-frame-text">
                      These are inflationary times, and it is very likely the cost of war, and thus the cost of
                      Regular PAW CARD issuance will increase over time. The navy's state of the art AI economist
                      (who has never been wrong) predicts a 10% increase in Regular PAW CARD issuance cost for every
                      100 BNB total investment in the game over time. Regular PAW CARD issuance cost starts from
                      0.05 BNB per each Regular PAW CARD and increases by 10% for every 100 BNB total investment
                      in the game over time. 100% of the Regular Card issuance fee is used to salvage GOLD tokens
                      to associated field bays.
                  </div>

              </div>
              <div className = "reg-economics__content-body-frame">
                  <div className = "reg-economics__content-body-frame-text-special">
                      As a means of recognizing long term support of the BEAR NAVY's war efforts, existing
                      Regular PAW CARD holders will always be able to have new Regular PAW CARDS issued at
                      the same price as an already owned Regular PAW CARD original cost.
                  </div>

              </div>

              </div>
      </div>
      </div>
      </div>
  );
}

export default RegEconomicsComponent;
