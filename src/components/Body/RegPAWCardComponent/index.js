import React from "react";
import {Scrollbars} from "react-custom-scrollbars";

import './regpawcard.scss';

import pawcard from '../../../assets/img/Paw Card.png'

import img1 from '../../../assets/img/P1.png'

import img2 from '../../../assets/img/P2.png'

import img3 from '../../../assets/img/P3.png'

import img4 from '../../../assets/img/p4.png'

function RegPAWCardComponent() {

const elements = () =>{
    return  <>
        <div className="section__text">
            Each VIP PAW CARD displays a Bear Navy PAW Operative Ship with a unique character set and can only move into one of the four field bays.
            The VIP PAW CARD is used to record the Open Chests obtained when the card moves into the VIP PAW CARD's associated field bay.
            <span className="text-decorator text-decorator--blue">
                The salvaged GOLD tokens received by each VIP PAW CARD’s Open Chest are claimable by clicking the withdraw button in front of the Open Chest.
                The withdrawal automatically closes the Chest and makes it ineligible to salvaged GOLD tokens from its registered field bay.
                Veterans (VIP PAW CARD holders) are advised to wait till their Open CHEST receives its complete eligible salvaged GOLD tokens (then Chest becomes Closed) before withdrawing their GOLD tokens.
            </span>
        </div>

        <div className="section__text">
            <span className="text-decorator text-decorator--blue">
              The Bear Navy PAW Operative Ship displayed on each VIP PAW CARD has four designs and beauty depending on the amount of Open Chest available on the card;
            </span>

            <div className="vpc-section__list">
                <div className="vpc-section__list-item">
                  <span className="text-decorator text-decorator--blue">1. GunBoat</span> - contains 0 to 10 Open Chest.
                </div>
                <div className="vpc-section__list-item">
                  <span className="text-decorator text-decorator--blue">2. BattleShip</span> - contains 11 to 100 Open Chest.
                </div>
                <div className="vpc-section__list-item">
                  <span className="text-decorator text-decorator--blue">3. Aircraft Carrier</span> - contains 101 to 1000 Open Chest.
                </div>
                <div className="vpc-section__list-item">
                  <span className="text-decorator text-decorator--blue">4. Destroyer</span> - contains 1001 or more Open Chest.
                </div>
            </div>
        </div>
    </>
};

  return (
      <section className="section vpc-section">
          <div className="container">
              <div className="section__content vpc-section__content">
                  <div className="section__left-content section__text-content vpc-section__left-content">
                      <h1 className="section__title vpc-section__title">VIP PAW CARD</h1>

                      <div className="section__right-content vpc-section__right-content">
                          <div className="reg-paw-card__left-content-img">
                              <img src={pawcard} alt=""/>
                              <img src={img1} className="reg-paw-card__left-content-img-first" alt=""/>
                              <img src={img2} className="reg-paw-card__left-content-img-second" alt=""/>
                              <img src={img3} className="reg-paw-card__left-content-img-third" alt=""/>
                              <img src={img4} className="reg-paw-card__left-content-img-forth" alt=""/>
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
