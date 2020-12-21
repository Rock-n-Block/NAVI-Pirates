import React from "react";

import {BearVSNavyComponent,
    GamesComponent,
    OfferingComponent,
    PAWComponent,
    RegPAWCardComponent,
    MissionEconomicsComponent,
    GOLDTokensComponent,
    WarStrategyComponent,
    PAWAuctionComponent,
    InfoComponent,
    RegEconomicsComponent
} from '../../components'

import './body.scss';

function Body() {
  return (
      <main className="main">
          <GamesComponent/>
          <OfferingComponent/>
          <BearVSNavyComponent/>
          <PAWComponent/>
          <RegPAWCardComponent/>
          <MissionEconomicsComponent/>
          <GOLDTokensComponent/>
          <WarStrategyComponent/>
          <RegEconomicsComponent/>
          <PAWAuctionComponent/>
          <InfoComponent/>
      </main>
  );
}

export default Body;
