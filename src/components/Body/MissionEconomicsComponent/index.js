import React from "react";
import {Scrollbars} from "react-custom-scrollbars";

import './missioneconomics.scss';

import bubbles from '../../../assets/img/mission-economics/bubbles.png'
import card from '../../../assets/img/mission-economics/card.png'
import chest from '../../../assets/img/mission-economics/chest.png'
import decorator1 from '../../../assets/img/mission-economics/decorator-1.png'
import decorator2 from '../../../assets/img/mission-economics/decorator-2.png'

function RegPAWCardComponent() {
    const [windowWidth, setWidth] = React.useState(window.innerWidth);

    const updateWidth = () => {
        setWidth(window.innerWidth);
    };

    React.useEffect(() => {
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    });

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
                        <div className="economics-section__distribution-descr">used to mint GOLD tokens to provide liquidity on Uniswap at the current price.</div>
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
                      <img src={bubbles} alt="" className="economics-section__bubbles"/>

                      <div className="section__right-content economics-section__right-content">
                          <div className="section__coordinator economics-section__coordinator">
                              <img src={chest} alt="" className="economics-section__chest"/>
                              <img src={card} alt="" className="economics-section__card"/>
                              <img src={decorator1} alt="" className="economics-section__decorator economics-section__decorator-1"/>
                              <img src={decorator2} alt="" className="economics-section__decorator economics-section__decorator-2"/>
                          </div>
                      </div>

                      <div className="section__scroll-content">
                          { windowWidth > 1279 ?
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
