import React from "react";
import "./css/index.css";
import {
  ButtonComponent,
  DatePickerComponent,
  LabelInput,
  NavbarComponent,
} from "../../components";

const AccountSettings = () => {
  return (
    <div className="black-background pb-4">
      <NavbarComponent selectedKey={"11"} headerText={"Account Settings"} />
      <div className="container">
        <h4
          className="white ms-4 semi-bold red-gradient-color mb-5"
          style={{ textAlign: "center", marginTop: 60 }}
        >
          Snap Boogie
        </h4>
        <div style={{ border: "1px solid #272727" }}></div>
        <div>
          <div
            className="d-flex justify-content-between"
            style={{ alignItems: "center", marginTop: 40 }}
          >
            <h5 className="m-0 white semi-regular">Account Information</h5>
            <h5 className="red-gradient-color cursor">Edit</h5>
          </div>
          <LabelInput label={"Full Name"} />
          <LabelInput label={"User name"} />
          <DatePickerComponent />
          <LabelInput label={"Contact Number"} />
          <LabelInput label={"Country"} />
        </div>
        <div>
          <div
            className="d-flex justify-content-between"
            style={{ alignItems: "center", marginTop: 40 }}
          >
            <h5 className="m-0 white semi-regular">User Credentials</h5>
            <h5 className="red-gradient-color cursor">Edit</h5>
          </div>
          <LabelInput label={"Change Email"} />
          <LabelInput password label={"Change Password"} />
          <LabelInput password label={"ReType Password"} />
        </div>
        <div className=" d-flex justify-content-center">

        <div className="mt-4 saveBtn" >
          <ButtonComponent text={"Save"} height={40} />
        </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
