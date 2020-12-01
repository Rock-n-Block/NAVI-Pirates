import './goldtokens.scss';
import React from "react";

function GOLDTokensComponent() {
  return (
      <div className = "gold-tokens">
      <div className = "row">
          <div className = "gold-tokens__content">
              <div className = "gold-tokens__content-title">
                  GOLD tokens
              </div>
              <div className = "gold-tokens__content-body">
              <div className = "gold-tokens__content-body-frame">
                  <div className = "gold-tokens__content-body-frame-text">
                      GOLD tokens have an unlimited supply; the GOLD tokens token current circulating supply at
                      any time can be seen from any Binance Smart Chain explorer.
                      The GOLD tokens token has a precision of 10, which means when you own 1 GOLD tokens,
                      you are holding 10^10, the smallest unit of GOLD tokens.
                      <span className="gold-tokens__content-body-frame-text-special">
                          The starting price of GOLD tokens on Pancake Swap will be 0.001 BNB, with no premine
                      for admins. Gold tokens is designed to always have enough BNB backing on PanCakeSwap
                      and liquidity provided is locked forever and hence has a built in gamified pumpamentals.
                      </span>
                  </div>
              </div>

              </div>
      </div>
      </div>
      </div>
  );
}

export default GOLDTokensComponent;
