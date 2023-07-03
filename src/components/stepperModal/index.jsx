import "./css/index.css";
import React, { useState } from "react";
import { Steps } from "antd";
import ListingStep from "./listingStep";
import QuantityStep from "./quantityStep";
import PurchaseStep from "./purchaseStep";
import { AiOutlineClose } from "react-icons/ai";

function StepperModal({ handleCancel }) {
  const { Step } = Steps;

  const [current, setCurrent] = useState(0);
  const onChange = (value) => {
    console.log("onChange:", current);
    setCurrent(value);
  };
  console.log("current",current)
  return (
    <div>
      <div className="mainWrapper">
        <Steps
        
        current={current} 
        // onChange={onChange}
        
        >
          <Step title="Listing" />
          <Step title="Quantity" />
          <Step title="Purchase" />
        </Steps>
      </div>
      <div className="subWrapper">
        {current === 0 && <ListingStep  setCurrent={setCurrent}/>}
        {current === 1 && <QuantityStep setCurrent={setCurrent}/>}
        {current === 2 && <PurchaseStep />}
        <button className="closeButton" onClick={() => {handleCancel(); setCurrent(0)}}>
  Close <AiOutlineClose className="closeIcon" />
</button>

      </div>
    </div>
  );
}

export default StepperModal;
