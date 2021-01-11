import React from "react";

import './paw.scss';

import game from '../../../assets/img/Game-1.png'
import bottle from '../../../assets/img/bottle.png'

function PAWComponent() {
  return (
      <section className="section paw-section">
          <div className="container">
              <div className="paw-section__content">
                  <h1 className="paw-section__title">Pirate Assault Warriors</h1>

                  <div className="paw-section__img">
                      <img src={game} alt=""/>
                  </div>

                  <div className="paw-section__text">
                      There is a continuous ongoing war in two field bays of a corner of the BEARing Sea between BEAR NAVY and Pirates. Two Pirate ships have been looting GOLD tokens (an ERC-20 token) by the chest load. In a move to "PAW OUT" these pirates, a secret black ops division of the BEAR NAVY formed, code name PAW (Pirate Assault Warriors).
                      <img src={bottle} alt="" className="paw-section__decorator"/>
                  </div>

                  <div className="paw-section__text paw-section__text--no-bg">
                      "When asked if the rumors were true, the Bear Games platform said they could neither confirm nor deny the existence of any so-called secret PAW division."
                  </div>

                  <div className="paw-section__text">
                      All war carries a cost, not only in lives but in money. This battle is no different. To help fund their efforts, the Bear Navy is offering veterans (that's those who play the game) CHEST (GOLD tokens bonds), minted at a rate of 125% of input ETH per player entry into any of the two field bays. Should YOU choose to be involved as a Veteran, you are required to obtain a certified and unique VIP PAW CARD (NFT token), where your Open CHEST and Closed Chest is recorded. Each VIP PAW CARD is used to move into only one field bay. You can mint any amount of CHEST of GOLD anytime you enter into any of the two field bays from any of your VIP PAW CARD owned, by depositing ETH, but there is a required minimum deposit of 0.01 ETH. To enter all two field bays, you must hold two VIP PAW CARD, one for each of the field bays. Each VIP PAW CARD carries a PAW Operative ship (see VIP PAW CARD below).
                      The Bear Navy salvages GOLD tokens for each field bays and distributes them proportionately to each Open CHEST in each field bays until they receive their eligible salvaged GOLD tokens (becomes a Closed Chest). On withdrawal of GOLD tokens salvaged to each Open CHEST anytime, the CHEST immediately becomes Closed and ineligible to salvage GOLD tokens.
                      {' '}
                      <span className="text-decorator text-decorator--blue">
                      Veterans are advised to wait till their Open CHEST receives its complete eligible salvaged GOLD tokens (then Chest becomes Closed) before withdrawing their GOLD tokens.
                      </span>
                  </div>
              </div>
          </div>
      </section>
  );
}

export default PAWComponent;
