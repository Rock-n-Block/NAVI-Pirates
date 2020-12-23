import React from "react";

import './goldtokens.scss';

import money from '../../../assets/img/Money.png'
import points from '../../../assets/img/points.png'
import waves from '../../../assets/img/waves.png'
import strs from '../../../assets/img/strs.png'

function GOLDTokensComponent() {
  return (
      <section className="section tokens-section">
          <div className="container">
              <div className="section__content tokens-section__content">
                  <div className="section__left-content section__text-content tokens-section__left-content">
                      <h1 className="section__title tokens-section__title">GOLD tokens</h1>

                      <img src={waves} alt="" className="tokens-section__decorator tokens-section__decorator-1"/>
                      <img src={strs} alt="" className="tokens-section__decorator tokens-section__decorator-2"/>

                      <div className="section__right-content tokens-section__right-content">
                          <div className="section__coordinator tokens-section__coordinator">
                              <img src={money} alt="" className="tokens-section__money"/>
                              <img src={points} alt="" className="tokens-section__decorator tokens-section__decorator-3"/>
                          </div>
                      </div>

                      <div className="section__scroll-content">
                          <div className="section__text">
                              GOLD tokens have an unlimited supply; the GOLD tokens token current circulating supply at any time can be seen from any Ethereum explorer.
                              The GOLD tokens token has a precision of 10, which means when you own 1 GOLD tokens, you are holding 10^10, the smallest unit of GOLD tokens.
                              <span className="text-decorator text-decorator--orange">
                                  The starting price of GOLD tokens on Uniswap can 0.000001 ETH, with no premine for admins.
                                  Gold tokens can designed always to have enough ETH backing on Uniswap and liquidity provided can locked forever and hence has a built in gamified pumpamentals.
                            </span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
  );
}

export default GOLDTokensComponent;
