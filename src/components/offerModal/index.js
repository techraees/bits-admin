import React, { useState } from "react";
import "./css/index.css";
import { logo } from "../../assets";
import BidModal from "../bidModal";
import { Modal, Table } from "antd";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/all";
const OfferModal = () => {
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [isTableOpen, setIsTableOpen] = useState(false);

  const handleDropDownClick = () => {
    setIsTableOpen(!isTableOpen);
  };
  const showModal = () => {
    setIsBidModalOpen(true);
  };
  const handleCancel = () => {
    setIsBidModalOpen(false);
  };

  const dataSource = [
    {
      key: "1",
      price: "0.001 WETH",
      uprice: "$20.24",
      quantity: "1",
      fdifference: "12% above",
      expiration: "in 9 days",
      from: "you",
    },
    {
      key: "2",
      price: "0.001 WETH",
      uprice: "$20.24",
      quantity: "1",
      fdifference: "12% above",
      expiration: "in 9 days",
      from: "you",
    },
    // {
    //   key: "3",
    //   price: "0.001 WETH",
    //   uprice: "$20.24",
    //   quantity: "1",
    //   fdifference: "12% above",
    //   expiration: "in 9 days",
    //   from: "you",
    // },
    // {
    //   key: "4",
    //   price: "0.001 WETH",
    //   uprice: "$20.24",
    //   quantity: "1",
    //   fdifference: "12% above",
    //   expiration: "in 9 days",
    //   from: "you",
    // },
  ];

  const columns = [
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "USD Price",
      dataIndex: "uprice",
      key: "uprice",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Floor Difference",
      dataIndex: "fdifference",
      key: "fdifference",
    },
    {
      title: "Expiration",
      dataIndex: "expiration",
      key: "expiration",
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
    },
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => <a>Cancel</a>,
    },
  ];
  return (
    <div>
      <Modal
        open={isBidModalOpen}
        onCancel={handleCancel}
        footer={false}
        centered
        width={829}
      >
        <BidModal handleCancel={handleCancel} />
      </Modal>
      <div className="main-wrapper">
        <div className="top-title">Place A Bid</div>
        <div className="info">
          <div className="d-flex gap-3 align-items-center">
            <div>
              <img src={logo} width={60} height={60} />
            </div>
            <div>
              <h5>1</h5>
              <p>0xdaf...70ef</p>
              {/* <p>0xdaF60d937a200b36688e4BfBA68Ef026231570Ef</p> */}
            </div>
          </div>

          <div>
            <h5>0.0001 WETH</h5>
            <p>$0.18</p>
          </div>
        </div>
        <div className="balance-info">
          {/* <div className="d-flex justify-content-between align-items-center">
            <h5>Balance</h5>
            <p>0.001 WETH</p>
          </div> */}
          <div className="d-flex justify-content-between align-items-center mt-2">
            <h5>Floor Price</h5>
            <p>- -</p>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <h5>Best Offer</h5>
            <p>- -</p>
          </div>
        </div>

        <div className="drop-down-div" onClick={handleDropDownClick}>
          <div className="d-flex justify-content-between">
            <h5>Offers</h5>
            {isTableOpen ? (
              <MdOutlineKeyboardArrowUp color="#ffffff" fontSize={20} />
            ) : (
              <MdOutlineKeyboardArrowDown color="#ffffff" fontSize={20} />
            )}
          </div>
        </div>

        <div className="table-div">
          {isTableOpen && (
            <Table
              dataSource={dataSource}
              columns={columns}
              scroll={{ x: 100 }}
            />
          )}
        </div>

        <div className="input-field-div">
          <input type="text" placeholder="0.001" />
          <h5>WETH</h5>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <p>$0.18 Total</p>
          <p>Total Offer amount: 0.001 WETH ($0.18)</p>
        </div>
        <div>
          <button className="bid-btn" onClick={showModal}>
            Place Bid
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferModal;
