import React from "react";
import "./css/index.css";
import { AiFillCheckCircle } from "react-icons/ai";

function SuccessModal() {
  return (
    <div className="successModal">
      <h4 className="paymentConfirmedText">
        Payment Confirmed <AiFillCheckCircle className="paymentCheckIcon" />
      </h4>
      <h6 className="totalAmountText">
        Total amount = 1.3 ETH <span className="numberText"> ($1564.03)</span>
      </h6>
    </div>
  );
}

export default SuccessModal;
