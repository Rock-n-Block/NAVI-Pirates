import React from "react";
import {Scrollbars} from "react-custom-scrollbars";

import './regeconomics.scss';

import bear from '../../../assets/img/uniswap/bear.svg'
import uniswap from '../../../assets/img/uniswap/uniswap.svg'
import decorator1 from '../../../assets/img/uniswap/decorator-1.svg'
import decorator2 from '../../../assets/img/uniswap/decorator-2.svg'
import decorator3 from '../../../assets/img/uniswap/decorator-3.svg'
import decorator4 from '../../../assets/img/uniswap/decorator-4.svg'
import decorator5 from '../../../assets/img/uniswap/decorator-5.svg'
import decorator6 from '../../../assets/img/uniswap/decorator-6.svg'

function RegEconomicsComponent() {
    const elements = () => {
        return <>
            <div className="section__text">
                Bear tokens is an ERC20 token, not mintable and has a fixed supply 150,000 BEAR. It is the governance token used to make changes and updates to the Bear Games platform. The Governance system will be a clone of the Compound protocol Governance system. More info about the  Governance structure will be released before Bear Games Governance system launch. Bear Token is allocated below;
            </div>

            <div className="section__text">
                <div className="uniswap-section__info">
                    <div className="uniswap-section__info-row">
                        <div className="uniswap-section__info-sum">100,000 BEAR</div>
                        <div className="uniswap-section__info-descr">Used to mint GOLD tokens to provide liquidity Uniswap at the current price.</div>
                    </div>

                    <div className="uniswap-section__info-row">
                        <div className="uniswap-section__info-sum">30,000 BEAR</div>
                        <div className="uniswap-section__info-descr">Used to provide liquidity in Uniswap + 65% of funds raised locked forever.</div>
                    </div>

                    <div className="uniswap-section__info-row">
                        <div className="uniswap-section__info-sum">13,000 BEAR</div>
                        <div className="uniswap-section__info-descr">Partner and Development tokens locked and released @ 10% monthly.</div>
                    </div>

                    <div className="uniswap-section__info-row">
                        <div className="uniswap-section__info-sum">7,000 BEAR</div>
                        <div className="uniswap-section__info-descr">Team tokens locked and released @ 10% per month from platform launch.</div>
                    </div>
                </div>
            </div>

            <div className="section__text">
                <div className="uniswap-section__max-purchased">Maximum BEAR that can be purchased by a single address is 2000 BEAR making the max Cap 10 ETH.</div>
            </div>
        </>
    };

  return (
      <section className="section uniswap-section">
          <div className="container">
              <div className="section__content section__content--reverse uniswap-section__content">
                  <div className="section__left-content section__text-content uniswap-section__left-content">
                      <h1 className="section__title uniswap-section__title">Bear tokens: Uniswap listing and Governance</h1>
                      <img src={decorator6} alt="" className="uniswap-section__decorator uniswap-section__decorator-6"/>

                      <div className="section__right-content uniswap-section__right-content">
                          <div className="section__coordinator uniswap-section__coordinator">
                              <img src={bear} alt="" className="uniswap-section__bear"/>
                              <img src={uniswap} alt="" className="uniswap-section__uniswap"/>
                              <img src={decorator1} alt="" className="uniswap-section__decorator uniswap-section__decorator-1"/>
                              <img src={decorator2} alt="" className="uniswap-section__decorator uniswap-section__decorator-2"/>
                              <img src={decorator3} alt="" className="uniswap-section__decorator uniswap-section__decorator-3"/>
                              <img src={decorator4} alt="" className="uniswap-section__decorator uniswap-section__decorator-4"/>
                              <img src={decorator5} alt="" className="uniswap-section__decorator uniswap-section__decorator-5"/>
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

export default RegEconomicsComponent;
