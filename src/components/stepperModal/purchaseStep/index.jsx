import React, { useState } from "react";
import "./css/index.css";
import { AiFillCheckCircle } from "react-icons/ai";
import { test } from "../../../assets";
import { SuccessModal } from "../../index";
import { Button, Modal } from "antd";

function PurchaseStep() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="purchaseStep">
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        centered
        width={706}
        className="successModal"
      >
        <SuccessModal />
      </Modal>
      <div className="purchaseStepMainWrapper">
        <div className="purchasecontentDiv">
          <div className="purchaseleftDiv">
            <div>
              <img className="purchaseImg" src={test} />
            </div>
            <div className="purchasetextWrapper">
              <h4 className="purchaseleftDivText">Speedy Walkover </h4>
              <h6 className="purchaseleftDivSubText"> From Snap Boogie</h6>
            </div>
          </div>
          <div className="purchaserightDiv">
            <h4 className="purchaseQtyText">Qty : 1</h4>
            <AiFillCheckCircle className="purchaseCheckIcon" fontSize={24} />
          </div>
        </div>
        <div className="purchaseText">
          <div className="purchaseTextLeftDiv">
            <h4 className="totalPrice">Total Price</h4>
          </div>
          <div className="purchaseTextRightDiv">
            <h4 className="purchaseNumber">
              1.3 <span className="purchaseNumberSpan"> ETH ($1564.03) </span>
            </h4>
          </div>
        </div>
        <button className="purchaseConnectBtn" onClick={showModal}>
          Connect Wallet
        </button>
      </div>
    </div>
  );
}

export default PurchaseStep;
