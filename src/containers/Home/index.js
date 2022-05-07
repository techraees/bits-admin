import React from "react";
import { profile_large, location, upload, search } from "../../assets";
import { ButtonComponent, NavbarComponent } from "../../components";
import "./css/index.css";
import { Input } from "antd";

const Collections = () => {
  const { Search } = Input;
  return (
    <div className="black-background">
      <NavbarComponent />
      <div className="container">
        <div
          style={{ alignItems: "center" }}
          className="d-flex justify-content-between collectionFirstContainer"
        >
          <div
            className="d-flex profileImageContainer"
            style={{ alignItems: "center" }}
          >
            <img src={profile_large} className="collectionImage" />
            <div className="userNameView">
              {/* <div className="ms-5"> */}
              <h3 className="red-gradient-color semi-bold">Snap Boogie</h3>
              <div className="d-flex">
                <h5 className="m-0 white">Boston, MA (USA)</h5>
                <img className="ms-2" src={location} />
              </div>
              <span className="light-grey">
                (Snap Boggie is a Professional Dancer){" "}
              </span>
              <div style={{ width: "60%" }} className="mt-4">
                <ButtonComponent simple text={"Edit Profile"} />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center uploadView1">
            <div className="d-flex py-4 uploadView">
              <img src={upload} />
              <p className="white m-0 mt-3">Upload Emote Video</p>
            </div>
          </div>
        </div>
        <div style={{ border: "1px solid #B23232" }}></div>
        {/* <Input
          className="py-2 input"
          placeholder="Search by number or contact."
          prefix={<img src={search} className="me-2" />}
        /> */}
        <div className="my-5">
          {/* <Search
            placeholder="Search Here..."
            style={{ width: "100%" }}
            className="searchStyle"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Collections;
