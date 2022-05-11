import React from "react";
import {
  about2,
  blue_layer,
  connect,
  metamask_tag,
  profile_large,
  white_layer,
} from "../../assets";
import { NavbarComponent } from "../../components";
import "./css/index.css";

const Payment = () => {
  return (
    <div className="black-background pb-4">
      <NavbarComponent selectedKey={"10"} headerText={"Payment"} />
      <div className="container">
        <div
          className="d-flex justify-content-center my-5"
          style={{ alignItems: "center" }}
        >
          <img src={about2} />
          <span className="light-grey ms-3">
            Choose your Payment Method for your Wallet
          </span>
        </div>
        <div className="d-flex my-4">
          <img src={profile_large} style={{ width: 70, height: 70 }} />
          <div className="ms-3">
            <span className="light-grey">Hi,</span>
            <p className="white">Snap Boogie</p>
          </div>
        </div>
        <div style={{ border: "1px solid #2d2d2d" }}></div>
        <div
          className="my-4 d-flex"
          style={{
            backgroundColor: "#2b2b2b",
            width: "100%",
            flexDirection: "column",
            borderRadius: 20,
          }}
        >
          <div
            className=""
            style={{ alignItems: "center" }}
          >
            <div
              style={{
                backgroundColor: "#D1F5FD",
                width: "45%",
                height: 300,
                borderRadius: 20,
              }}
              className=""
            >
              <div className="d-flex justify-content-between">
                <div className="m-3">
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
              <span>Total Balance</span>
              <span>$10,748</span>
              <div>
                <img src={connect} />
                <span>Connect Metamask</span>
              </div>
            </div>
            <div
              className="pink-gradient "
              style={{ width: "100%", height: 300, borderRadius: 20 }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
