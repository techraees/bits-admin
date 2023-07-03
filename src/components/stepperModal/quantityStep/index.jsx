import React, { useState } from "react";
import { test } from "../../../assets";
import "./css/index.css";
import { AiFillCheckCircle } from "react-icons/ai";

function QuantityStep({setCurrent={setCurrent}}) {
  return (
    <div className="quantityStep">
      <div className="quantityStepMainWrapper">
        <div className="quantitycontentDiv">
          <div className="quantityleftDiv">
            <div>
              <img className="quantityImg" src={test} />
            </div>
            <div className="quantitytextWrapper">
              <h4 className="quantityleftDivText">Speedy Walkover </h4>
              <h6 className="quantityleftDivSubText"> From Snap Boogie</h6>
            </div>
          </div>
          <div className="quantityrightDiv">
            <AiFillCheckCircle className="checkIcon" fontSize={24} />
          </div>
        </div>

        <div className="quantityBottomDiv">
          <div className="quanitityBottomLeftDiv">
            <h6 className="selectQuantity">Select Quantity</h6>
            <input type="number" className="numberField" placeholder="1" />
          </div>
          <div className="quanitityBottomRightDiv">
            <button className="goBtn" onClick={() => setCurrent(2)}>Go</button>
          </div>
        </div>

        <div className="quantitytextContainer">
          <div className="quantitytextLeftContainer">
            <h4 className="priceText"> Total Price: </h4>
          </div>
          <div className="quantitytextRightContainer">
            <h4 className="numText">
              1.3 <span className="ethText">ETH ($1564.03)</span>
            </h4>
          </div>
        </div>
        <div>
          <h4 className="bottomPriceText">
            1 Ethereum = <span className="dollarSpan"> $1250.58</span>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default QuantityStep;
