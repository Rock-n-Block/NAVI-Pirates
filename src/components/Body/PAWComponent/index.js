import React from "react";

import './paw.scss';

import bottle from '../../../assets/img/bottle.png'

function PAWComponent() {
  return (
      <div className = "paw">
      <div className = "row">
          <div className = "paw__content">
              <div className = "paw__content-title">
                  Pirate Assault Warriors
              </div>
              <div className = "paw__content-frame">
              <div className = "paw__content-frame-text">
                  There is a continuous ongoing war in four field bays of a corner of the BEARing
                  Sea between BEAR NAVY and Pirates. Four Pirates ships have been looting GOLD tokens
                  (a BEP-20 token) by the chest load. In a move to "PAW OUT" these pirates, a secret black
                  ops division of the BEAR NAVY has been formed, code name PAW (Pirate Assault Warriors).
              </div>
                  <div className = "paw__content-frame-bottle">
                      <img src={bottle} alt=""/>
                  </div>
              </div>
              <div className = "paw__content-frame">
              <div className = "paw__content-frame-text">
                  When asked if the rumors were true, the Bear Games platform said they could neither
                  confirm nor deny the existence of any so-called secret PAW division.
              </div>
              </div>
              <div className = "paw__content-frame">
              <div className = "paw__content-frame-text">
                  All war carries a cost, not only in lives but in money. This battle is no different.
                  To help fund their efforts, the Bear Navy is offering veterans (that's those who play
                  the game) CHEST (GOLD tokens bonds), minted at a rate of 125% of input BNB per player entry
                  into any of the four field bays. Should YOU choose to be involved as a Veteran, you are
                  required to obtain a certified and unique Regular PAW CARD (NFT token), where your Open
                  CHEST and Closed Chest shall be recorded. Each Regular PAW CARD is used to move into only one
                  field bay. You can mint any amount of CHEST anytime you enter into any of the four fields bay
                  from any of your Regular PAW CARD owned, by depositing BNB, but there is a required minimum
                  deposit of 0.05 BNB.
                  <span className = "paw__content-frame-text-special">To enter all four field bays, you must hold more than four Regular PAW
                  CARD, one or more for each four field bays.
                  </span>
                  At launch, there is a 0.05 BNB cost for the
                  issuance of each Regular PAW CARD, which increases with the total BNB entering the game
                  (see PAW CARD Issuance ECONOMICS below). Each PAW CARD carries a PAW Operative ship (see
                  Regular PAW CARD below). The same Regular PAW CARD is used to record the number of unmatured
                  (Open) CHEST acquired when entering the field bay associated with that Regular PAW CARD. The
                  Bear Navy salvages GOLD tokens for each of the four field bays and distributes them
                  proportionately to each Open CHEST in each four field bays until they receive their eligible
                  salvaged GOLD tokens (becomes a Closed Chest). On withdrawal of GOLD tokens salvaged to each
                  Open CHEST anytime, the CHEST immediately becomes Closed and ineligible to salvage GOLD tokens.
                  <span className = "paw__content-frame-text-special">
                  Veterans are advised to wait till their Open CHEST receives its complete eligible salvaged
                  GOLD tokens (then Chest becomes Closed) before withdrawing their GOLD tokens.
                  </span>
              </div>

              </div>
      </div>
      </div>
      </div>
  );
}

export default PAWComponent;
