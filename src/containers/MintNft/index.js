import React, { useState } from "react";
import {
  right_arrow,
  enjin_icon,
  count_down_icon,
  count_up_icon,
} from "../../assets";
import { ButtonComponent, NavbarComponent, LabelInput } from "../../components";
import "./css/index.css";
import { Row, Col, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";

const MintNft = () => {
  const backgroundTheme = useSelector(
    (state) => state.app.theme.backgroundTheme
  );
  const textColor = useSelector((state) => state.app.theme.textColor);
  const textColor2 = useSelector((state) => state.app.theme.textColor2);
  const textColor3 = useSelector((state) => state.app.theme.textColor3);
  const bgColor = useSelector((state) => state.app.theme.bgColor);
  const [mintQuantity, setMintQuantity] = useState(5);
  let navigate = useNavigate();
  return (
    <div className={`${backgroundTheme}`}>
      <NavbarComponent
        toggleBtn={textColor === "white" ? true : false}
        selectedKey={"5"}
        headerText={"Mint NFT"}
      />
      <div className="container py-3">
        <div className="d-flex align-items-center">
          <img src={right_arrow} />
          <span className={`${textColor2} fs-5 py-3 ms-2`}>NFT Details</span>
        </div>
        <Row
          style={{ width: "100%" }}
          className={`d-flex searchStyle ${bgColor} my-4 p-5`}
        >
          <Col lg={14} sm={24} xs={24} className="borderBottom">
            <Row gutter={{ xs: 8, sm: 16, md: 30, lg: 50 }}>
              <Col lg={10} sm={24} md={12} xs={24}>
                <div className="cardContainer" style={{ width: "100%" }}>
                  <ReactPlayer
                    controls={true}
                    width="auto"
                    height="260px"
                    url="https://www.youtube.com/watch?v=9xwazD5SyVg"
                  />
                </div>
                <div
                  style={{ border: "1px solid  #B23232" }}
                  className="p-1 mt-4 text-center rounded-3"
                >
                  <span className={`${textColor2}`}>View on EnjinX</span>
                </div>
              </Col>
              <Col lg={14} sm={24} md={12} xs={24}>
                <div>
                  <div className="my-3">
                    <p className={`${textColor} mb-1 fs-5`}>Name</p>
                    <p className={`${textColor2} m-0 fs-6`}>Speedywalkover</p>
                    <p className="red fs-6">Snap Boogie</p>
                  </div>
                  <div className="my-3">
                    <p className={`${textColor} m-0 fs-5`}>NFT ID</p>
                    <p className={`${textColor2} m-0 fs-6`}>#89832823289</p>
                  </div>
                  <div className="my-3">
                    <p className={`${textColor} m-0 fs-5`}>
                      Enjin Reserve Per NFT
                    </p>
                    <div className="d-flex align-items-center">
                      <img src={enjin_icon} />
                      <p className={`${textColor2} m-0 fs-6 ms-2`}>12.5 </p>
                    </div>
                  </div>
                </div>
                <div style={{ borderRight: "1px solid #B23232" }} />
              </Col>
            </Row>
          </Col>
          <Col lg={10} sm={24} xs={24}>
            <div className="supplyView">
              <div className="my-3">
                <p className={`${textColor} mb-1 fs-5`}>Circulating Supply</p>
                <p className={`${textColor2} m-0 fs-6`}>2</p>
              </div>
              <div className="my-3">
                <p className={`${textColor} mb-1 fs-5`}>
                  Maximum Total Supply Supply
                </p>
                <p className={`${textColor2} m-0 fs-6`}>2</p>
              </div>
              <div className="my-3">
                <p className={`${textColor} mb-1 fs-5`}>Supply Type</p>
                <p className={`${textColor2} m-0 fs-6`}>Collapsing</p>
              </div>
            </div>
          </Col>
        </Row>
        <div className="d-flex align-items-center">
          <img src={right_arrow} />
          <span className={`${textColor2} fs-5 py-3 ms-2`}>Mint Details</span>
        </div>
        <div style={{ width: "100%" }} className={` ${bgColor} my-4 p-5`}>
          <span className={`${textColor} fs-6 mb-3`}>
            Based on your linked wallet balance of 102,000 and your reserve of 0
            item(s), you can mint a maximun of 0 item(s).
          </span>
          <Row>
            <Col
              lg={4}
              md={10}
              sm={12}
              xs={24}
              className="d-flex align-items-center"
            >
              <div
                style={{ border: "1px solid  #B23232", width: 100 }}
                className="p-1 mt-4 text-center rounded-3 d-flex align-items-center justify-content-between"
              >
                <div style={{ width: 80 }}>
                  <span className={`${textColor2}`}>{mintQuantity}</span>
                </div>
                <div className="d-flex flex-column">
                  <img src={count_up_icon} className="mb-1" />
                  <img src={count_down_icon} />
                </div>
              </div>
              <span
                className={`${textColor2}  fs-6 mx-4`}
                style={{ marginBottom: -20 }}
              >
                OR
              </span>
            </Col>
            <Col lg={20} md={14} sm={12} xs={24}>
              <LabelInput
                borderColor={"#B23232"}
                placeholder={"Type Quantity to Mint"}
              />
            </Col>
          </Row>
          <LabelInput
            borderColor={"#B23232"}
            placeholder={"Recipient Address"}
          />
          <div className="mt-3">
            <div className="d-flex align-items-center">
              <p className={`${textColor} fs-6 m-0`}>
                Total Required Enjin for Quantity :
              </p>
              <img src={enjin_icon} className="ms-3" />
              <p className={`${textColor2} m-0 fs-6 ms-2`}>12.5 </p>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <div className="me-3">
            <Button
              className="px-5 cancelBtn"
              style={{ backgroundColor: "transparent", color: textColor }}
            >
              Cancel
            </Button>
          </div>
          <div className="ms-3">
            <ButtonComponent text={"Mint NFT"} width={150} height={40} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintNft;
