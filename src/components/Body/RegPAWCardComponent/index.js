import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

import "./regpawcard.scss";

import anchor from "../../../assets/img/vip-paw-card/anchor.png";
import card1 from "../../../assets/img/vip-paw-card/card-1.png";
import card2 from "../../../assets/img/vip-paw-card/card-2.png";
import coins from "../../../assets/img/vip-paw-card/coins.png";
import decorator1 from "../../../assets/img/vip-paw-card/decorator-1.png";
import decorator2 from "../../../assets/img/vip-paw-card/decorator-2.png";
import decorator3 from "../../../assets/img/vip-paw-card/decorator-3.png";
import decorator4 from "../../../assets/img/vip-paw-card/decorator-4.png";

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
        Each VIP PAW CARD displays a Bear Navy PAW Operative Ship with a unique character set and can only move into one
        of the four field bays.
        The VIP PAW CARD is used to record the Open Chests obtained when the card moves into the VIP PAW CARD's
        associated field bay.
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
            <span className="text-decorator text-decorator--blue">3. Aircraft Carrier</span> - contains 101 to 1000 Open
            Chest.
          </div>
          <div className="vpc-section__list-item">
            <span className="text-decorator text-decorator--blue">4. Destroyer</span> - contains 1001 or more Open
            Chest.
          </div>
        </div>
      </div>
    </>;
  };

  return (
    <section className="section vpc-section">
      <div className="container">
        <div className="section__content vpc-section__content">
          <div className="section__left-content section__text-content vpc-section__left-content">
            <h1 className="section__title vpc-section__title">VIP PAW CARD</h1>

            <div className="section__right-content vpc-section__right-content">
              <div className="section__coordinator vpc-section__coordinator">
                <img src={anchor} alt="" className="vpc-section__anchor"/>
                <img src={card1} alt="" className="vpc-section__card vpc-section__card-1"/>
                <img src={card2} alt="" className="vpc-section__card vpc-section__card-2"/>
                <img src={coins} alt="" className="vpc-section__coins"/>
                <img src={decorator1} alt="" className="vpc-section__decorator vpc-section__decorator-1"/>
                <img src={decorator2} alt="" className="vpc-section__decorator vpc-section__decorator-2"/>
                <img src={decorator3} alt="" className="vpc-section__decorator vpc-section__decorator-3"/>
                <img src={decorator4} alt="" className="vpc-section__decorator vpc-section__decorator-4"/>
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
