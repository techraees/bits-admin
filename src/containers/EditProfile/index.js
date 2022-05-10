import React from "react";
import "./css/index.css";
import { NavbarComponent } from "../../components";
import { Input } from "antd";
import { account2, book, location2, profile_large } from "../../assets";

const EditProfile = () => {
  return (
    <div className="black-background pb-4">
      <NavbarComponent selectedKey={"11"} headerText={"Edit Profile"} />
      <div className="container">
        <div
          className="d-flex mb-4"
          style={{ flexDirection: "column", alignItems: "center" }}
        >
          <img src={profile_large} className="mt-4 mb-3" />
          <h5 className="red cursor" style={{ textDecoration: "underline" }}>
            Change Profile Photo
          </h5>
        </div>
        <div style={{ border: "1px solid #272727" }}></div>
        <div
          className="d-flex justify-content-between mt-4 mb-4"
          style={{ alignItems: "center" }}
        >
          <h5 className="m-0 white semi-regular">Account Information</h5>
          <h5 className="red-gradient-color cursor">Edit</h5>
        </div>
        <div className="my-3">
          <p className="light-grey2 ms-3" style={{ marginBottom: -15 }}>
            Name
          </p>
          <div style={{ backgroundColor: "#464646", borderRadius: 10 }}>
            <div className="mt-3">
              <img
                src={account2}
                className="ms-4 mt-3"
                style={{ width: 15, position: "absolute", zIndex: 1 }}
              />
            </div>
            <Input value={"Snap Boggie"} className="editProfileInput" />
          </div>
        </div>
        <div className="my-3">
          <p className="light-grey2 ms-3" style={{ marginBottom: -15 }}>
            Bio
          </p>
          <div style={{ backgroundColor: "#464646", borderRadius: 10 }}>
            <div className="mt-3">
              <img
                src={book}
                className="ms-4 mt-3"
                style={{ width: 15, position: "absolute", zIndex: 1 }}
              />
            </div>
            <Input value={'Snap Boggie is a Professional Dancer'} className="editProfileInput" />
          </div>
        </div>
        <div className="my-3">
          <p className="light-grey2 ms-3" style={{ marginBottom: -15 }}>
          Country
          </p>
          <div style={{ backgroundColor: "#464646", borderRadius: 10 }}>
            <div className="mt-3">
              <img
                src={location2}
                className="ms-4 mt-3"
                style={{ width: 15, position: "absolute", zIndex: 1 }}
              />
            </div>
            <Input value={'Boston, MA (USA)'} className="editProfileInput" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
