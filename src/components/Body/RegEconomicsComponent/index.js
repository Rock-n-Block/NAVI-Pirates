import React from "react";
import {Scrollbars} from "react-custom-scrollbars";

import './regeconomics.scss';

import img from '../../../assets/img/pawCard2.png'
import bubbles from "../../../assets/img/bubbles.png";
import addCard from "../../../assets/img/AddCard.png";

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
        </>
    };

  return (
      <section className="section uniswap-section">
          <div className="container">
              <div className="section__content section__content--reverse uniswap-section__content">
                  <div className="section__left-content section__text-content uniswap-section__left-content">
                      <h1 className="section__title uniswap-section__title">Bear tokens: Uniswap listing and Governance</h1>
                      <img className="mission-economics__right-content-bubbles" src={bubbles} alt=""/>

                      <div className="section__right-content uniswap-section__right-content">
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

export default RegEconomicsComponent;
