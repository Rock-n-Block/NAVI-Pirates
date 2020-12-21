import React from "react";
import {Scrollbars} from "react-custom-scrollbars";

import './missioneconomics.scss';


import addCard from '../../../assets/img/AddCard.png'
import bubbles from '../../../assets/img/bubbles.png'
import me1 from '../../../assets/img/me-1.png'
import me2 from '../../../assets/img/me-2.png'
import pawcard from "../../../assets/img/Paw Card.png";
import img1 from "../../../assets/img/P1.png";
import img2 from "../../../assets/img/P2.png";
import img3 from "../../../assets/img/P3.png";
import img4 from "../../../assets/img/p4.png";

function RegPAWCardComponent() {

    const elements = () => {
        return <>
            <div className="section__text">
                1/4 of ETH entering each field bay is paid to the Injury Insurance Pool (displayed as a wound lottery jackpot on the PAW Operative VIP Card) for that field bay. In comparison, 3/4 of ETH entering each field bay is paid to the Divs Payout Pool for that field bay.
            </div>

            <div className="section__text">
                <div className="economics-section__distribution">
                    <div className="economics-section__distribution-title">ETH in the Divs Payout Pool is distributed as follows;</div>

                    <div className="economics-section__distribution-row">
                        <div className="economics-section__distribution-num">60%</div>
                        <div className="economics-section__distribution-descr">used to mint GOLD tokens to provide liquidity Uniswap at the current price.</div>
                    </div>

                    <div className="economics-section__distribution-row">
                        <div className="economics-section__distribution-num">20%</div>
                        <div className="economics-section__distribution-descr">used to buyback GOLD tokens (BEAR NAVY salvaging) on Uniswap.</div>
                    </div>

                    <div className="economics-section__distribution-row">
                        <div className="economics-section__distribution-num">3%</div>
                        <div className="economics-section__distribution-descr">is sent to the Ecosystem Fund address used for platform operational cost.</div>
                    </div>

                    <div className="economics-section__distribution-row">
                        <div className="economics-section__distribution-num"><span className="text-decorator text-decorator--blue">10%</span></div>
                        <div className="economics-section__distribution-descr"><span className="text-decorator text-decorator--blue">is paid in ETH proportionately to PAW VIP CARD holders issued in the INO.</span></div>
                    </div>

                    <div className="economics-section__distribution-row">
                        <div className="economics-section__distribution-num">5%</div>
                        <div className="economics-section__distribution-descr">is paid to the Founding team addresses in ETH.</div>
                    </div>

                    <div className="economics-section__distribution-row">
                        <div className="economics-section__distribution-num"></div>
                        <div className="economics-section__distribution-descr">Ecosystem Fund Auto buys GOLD tokens.</div>
                    </div>
                </div>
            </div>
        </>
    };

  return (
      <section className="section economics-section">
          <div className="container">
              <div className="section__content section__content--reverse economics-section__content">
                  <div className="section__left-content section__text-content economics-section__left-content">
                      <h1 className="section__title economics-section__title">Mission <br/> Economics</h1>
                      <img className="mission-economics__right-content-bubbles" src={bubbles} alt=""/>

                      <div className="section__right-content economics-section__right-content">
                          <div className="reg-paw-card__left-content-img">
                              <img src={addCard} alt=""/>
                          </div>
                      </div>

                      <div className="section__scroll-content">
                          { window.innerWidth > 1200 ?
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

export default RegPAWCardComponent;
