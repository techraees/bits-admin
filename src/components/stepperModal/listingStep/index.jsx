import React from "react";
import "./css/index.css";
import { test } from "../../../assets";

function ListingStep({ setCurrent }) {
  const contentDivData = [
    { id: 1 },
    {
      id: 2,
      bottom: true,
    },
    {
      id: 2,
      bottom: true,
    },
    {
      id: 2,
      bottom: true,
    },
  ];
  return (
    <div className="listingStepContainer">
      <h4 className="noteText">
        Note: &nbsp;
        <span className="spanText">
          This Item Seller is Snap Boogie. Select Which NFT would you like to
          proceed with
        </span>
      </h4>
      {contentDivData.map((item) => (
        <div
          className={item.bottom ? "bottomContentDiv" : "contentDiv"}
          key={item.id}
          onClick={() => setCurrent(1)}
        >
          <div className="leftDiv">
            <img className="divImg" src={test} />
            <div>
              <h4 className="leftDivText">Speedy Walkover </h4>
              <p>20 NFTs Available</p>
            </div>

            <h6 className="leftDivSubText"> (From Snap Boogie)</h6>
          </div>
          <div className="rightDiv">
            <h4 className="numText">
              1.3 <span className="ethText">Eth</span>
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListingStep;
