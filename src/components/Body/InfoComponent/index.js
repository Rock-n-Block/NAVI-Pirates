import React from "react";

import './info.scss';

function InfoComponent() {
  return (
      <section className="section info-section">
          <div className="container">
              <div className="info-section__content">

                  <div className="info-section__text">
                  You accept all risks of using Bear Games, Initial NFT Offering, and decentralized games launched on the future platform. As far as the law allows, the founding team and its suppliers (developers) provide the platform as written in this document, without any warranty.
                  </div>

                  <div className="info-section__text">
                  Bear Games may hyperlink to and integrate other decentralized platforms and services run by other companies (uniswap.org as seen in this paper, version 1.0) and does not make any warranty about services run by others or content they may provide. Use of services run by others may be governed by additional terms between you and the one running services and the platform.
                  </div>

                  <div className="info-section__text">
                  By participating in Bear Navy's Initial NFT Offering, you agree that you are not a citizen of Korea, the United States, China, and other jurisdictions or territories where token sales and  cryptocurrency trade are illegal, ICO is banned or restricted, regardless of your location.
                  </div>

                  <div className="info-section__text">
                  The purchaser understands and accepts that all purchases of VIP PAW Card NFT tokens are final and may be reversed only in case the minimum sale after 28 days of INO launch does not exceed the soft cap (300 ETH - 60,000 VIP PAW NFT Sold). After an unsuccessful sale, the purchaser needs to return the VIP PAW NFT Card before a refund. Maximum NFT that can be purchased by a single address is 2000 NFT.
                  </div>

              </div>
          </div>
      </section>
  );
}

export default InfoComponent;
