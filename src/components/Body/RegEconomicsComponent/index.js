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
                <p>
                    $BEAR token is an ERC20 token, not mintable, and has a fixed supply of 1,000,000 BEAR. It is the governance token used to make changes and updates to the Bear Games platform. The Governance system is a token permission governance system powered by <a href="https://collab.land" target="_blank">Collab.land</a> on Telegram.
                </p>
                <p>
                    Token Permission Chat allows us to create an exclusive chatroom for members who hold a certain amount of BEAR tokens. To enter in the BEAR Governance group, one must hold at least 1000 $BEAR tokens in their MetaMask wallet. BEAR Games uses the Collab.Land telegram bot built by the <a href="https://abridged.io" target="_blank">Abridged.io</a> team to verify ownership of the BEAR tokens.
                </p>
                <p>
                  BEAR Token allocation is seen below;
                </p>
            </div>

            <div className="section__text">
                <div className="uniswap-section__info">
                    <div className="uniswap-section__info-row">
                        <div className="uniswap-section__info-sum">500,000 $BEAR</div>
                        <div className="uniswap-section__info-descr">
                            Distributed 1:5 to VIP PAW NFT buyers a day after INO completion.
                        </div>
                    </div>

                    <div className="uniswap-section__info-row">
                        <div className="uniswap-section__info-sum">200,000 $BEAR</div>
                        <div className="uniswap-section__info-descr">Used to provide liquidity in  Uniswap  +  60%  of funds raised locked forever.</div>
                    </div>

                    <div className="uniswap-section__info-row">
                        <div className="uniswap-section__info-sum">50,000 $BEAR</div>
                        <div className="uniswap-section__info-descr">10% discount distributed as Gas Bonus to INO contributors.</div>
                    </div>

                    <div className="uniswap-section__info-row">
                        <div className="uniswap-section__info-sum">120,000 $BEAR</div>
                        <div className="uniswap-section__info-descr">Reserve tokens for partner, marketing and development tokens locked and released @ 10% monthly for 10 months.</div>
                    </div>

                    <div className="uniswap-section__info-row">
                        <div className="uniswap-section__info-sum">100,000 $BEAR</div>
                        <div className="uniswap-section__info-descr">Team tokens locked and released @ 10% per month for 25 months.</div>
                    </div>

                    <div className="uniswap-section__info-row">
                        <div className="uniswap-section__info-sum">30,000 $BEAR</div>
                        <div className="uniswap-section__info-descr">Used for Liquidity Mining program to incentivize Liquidity for $BEAR token Uniswap liquidity providers per @ 3000 $BEAR per month for 10 months.</div>
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

export default RegEconomicsComponent;
