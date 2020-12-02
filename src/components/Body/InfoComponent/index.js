import React from "react";

import './info.scss';

function InfoComponent() {
  return (
      <div className = "info">
      <div className = "row">
          <div className = "info__content">
            <div className = "info__content-text">
                You accept all risks of using Bear Games, Initial NFT Offering, and decentralized games launched on the
                future platform. As far as the law allows, the founding team and its suppliers (developers) provide the
                platform as written in this document, without any warranty.
            </div>
              <div className = "info__content-text">
                  Bear Games may hyperlink to and integrate other decentralized platforms and services run by other
                  companies (Pancakeswap.fnance as seen in this paper, version 1.0) and does not make any warranty
                  about services run by others or content they may provide. Use of services run by others may be governed
                  by additional terms between you and the one running services and the platform.
              </div>
              <div className = "info__content-text">
                  By participating in Bear Navy's Initial NFT Offering, you agree that you are not a citizen of Korea,
                  the United States, China, and other jurisdictions or territories where token sales are illegal
                  cryptocurrency trade, ICO is banned or restricted, regardless of their location. The purchaser
                  understands and accepts that all purchases of  VIP PAW Card NFT Tokens are final and may be reversed
                  only in case the minimum sale does not exceed the soft cap.
              </div>
      </div>
      </div>
      </div>
  );
}

export default InfoComponent;
