import React from "react";
import {
  about2,
  about3,
  blue_layer,
  connect,
  metamask_tag,
  paypal_tag,
  pink_layer,
  profile_large,
  white_layer,
} from "../../assets";
import { NavbarComponent } from "../../components";
import "./css/index.css";
import { Button } from "antd";
import { useSelector } from "react-redux";

const Payment = () => {
  const backgroundTheme = useSelector(
    (state) => state.app.theme.backgroundTheme
  );
  const textColor = useSelector((state) => state.app.theme.textColor);
  const textColor2 = useSelector((state) => state.app.theme.textColor2);
  const bgColor3 = useSelector((state) => state.app.theme.bgColor3);
  return (
    <div className={`${backgroundTheme} pb-4`} style={{ minHeight: "100vh" }}>
      <NavbarComponent
        toggleBtn={textColor === "white" ? true : false}
        selectedKey={"10"}
        headerText={"Payment"}
      />
      <div className="container">
        <div
          className="d-flex justify-content-center my-5"
          style={{ alignItems: "center" }}
        >
          <img src={textColor === "white" ? about2 : about3} />
          <span className={`${textColor2} ms-3`}>
            Choose your Payment Method for your Wallet
          </span>
        </div>
        <div className="d-flex my-4">
          <img src={profile_large} style={{ width: 70, height: 70 }} />
          <div className="ms-3">
            <span className={textColor2}>Hi,</span>
            <p className={textColor}>Snap Boogie</p>
          </div>
        </div>
        <div style={{ border: "1px solid #2d2d2d" }}></div>
        <div
          className={`my-4 ${bgColor3}`}
          style={{
            // backgroundColor: "#2b2b2b",
            width: "100%",
            // flexDirection: "column",
            borderRadius: 20,
          }}
        >
          <div className="d-flex paymentCardsView">
            <div
              style={{
                backgroundColor: "#D1F5FD",
                borderRadius: 20,
              }}
              className="paymentCards m-4"
            >
              <div className="d-flex justify-content-between">
                <div className="tapStyle">
                  <img src={metamask_tag} />
                </div>
                <div className="d-flex">
                  <div>
                    <img src={blue_layer} />
                  </div>
                  <div style={{ marginLeft: -60 }}>
                    <img src={white_layer} />
                  </div>
                </div>
              </div>
              <div className="d-flex cardContent">
                <h5 style={{ color: "#a4c1c7" }}>Total Balance</h5>
                <h1 style={{ color: "#2B5963" }} className="semi-bold">
                  $10,748
                </h1>
                <Button className="metamaskBtn px-4 mb-4">
                  <img src={connect} />
                  <span className="ms-2">Connect Metamask</span>
                </Button>{" "}
              </div>
            </div>
            <div
              className="pink-gradient m-4 paymentCards"
              style={{ borderRadius: 20 }}
            >
              <div className="d-flex justify-content-between">
                <div className="tapStyle">
                  <img src={paypal_tag} />
                </div>
                <div className="d-flex">
                  <div>
                    <img src={pink_layer} />
                  </div>
                  <div style={{ marginLeft: -60 }}>
                    <img src={white_layer} />
                  </div>
                </div>
              </div>
              <div className="d-flex cardContent">
                <h5 style={{ color: "#c3778a" }}>Total Balance</h5>
                <h1 style={{ color: "#2B5963" }} className="semi-bold">
                  $10,748
                </h1>
                <Button className="metamaskBtn mb-4">
                  <img src={connect} />
                  <span className="ms-2">Connect Paypal</span>
                </Button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
