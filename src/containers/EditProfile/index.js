import React, { useState } from "react";
import "./css/index.css";
import { ButtonComponent, NavbarComponent } from "../../components";
import { Input } from "antd";
import {
  account2,
  account_dark,
  book,
  book_dark,
  down_arrow2,
  down_arrow4,
  left_arrow,
  location2,
  location_dark2,
  profile_large,
} from "../../assets";
import { useSelector } from "react-redux";

const EditProfile = () => {
  const [city, setCity] = useState("");
  let cities = [
    "Boston, MA (USA)",
    "New York City, NYC (USA)",
    "Washington DC, Washington (USA)",
    "Boston, MA",
    "New York City, NYC",
    "Washington DC, Washington",
  ];
  let filterization = cities.filter((e) => {
    if (city) {
      if (e.includes(city)) return e;
    }
  });
  const backgroundTheme = useSelector(
    (state) => state.app.theme.backgroundTheme
  );
  const textColor = useSelector((state) => state.app.theme.textColor);
  const textColor2 = useSelector((state) => state.app.theme.textColor2);
  const bgColor3 = useSelector((state) => state.app.theme.bgColor3);
  return (
    <div className={`${backgroundTheme} pb-4`}>
      <NavbarComponent
        toggleBtn={textColor === "white" ? true : false}
        selectedKey={"11"}
        headerText={"Edit Profile"}
      />
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
          <h5 className={`m-0 ${textColor} semi-regular`}>
            Account Information
          </h5>
          <h5 className="red-gradient-color cursor">Edit</h5>
        </div>
        <div className="my-3">
          <p className={`${textColor2} ms-3`} style={{ marginBottom: -5 }}>
            Name
          </p>
          <div className={bgColor3} style={{ borderRadius: 10 }}>
            <div className="mt-3">
              <img
                src={textColor === "white" ? account2 : account_dark}
                className="ms-4 mt-3"
                style={{ width: 15, position: "absolute", zIndex: 1 }}
              />
            </div>
            <Input value={"Snap Boggie"} className="editProfileInput" />
          </div>
        </div>
        <div className="my-3">
          <p className={`${textColor2} ms-3`}>Bio</p>
          <div
            className={`d-flex justify-content-between ${bgColor3}`}
            style={{
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <div>
              <div>
                <img
                  src={book}
                  className="ms-4 mt-3"
                  style={{ width: 15, position: "absolute", zIndex: 1 }}
                />
              </div>
              <Input
                value={"Snap Boggie is a Professional Dancer"}
                className="editProfileInput"
              />
            </div>
            <span className="red me-3">35/50</span>
          </div>
        </div>
        <div className="my-3">
          <p className={`${textColor2} ms-3`}>Country</p>
          <div
            className={`d-flex justify-content-between ${bgColor3}`}
            style={{
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <div>
              <div>
                <img
                  src={textColor === "white" ? location2 : location_dark2}
                  className="ms-4 mt-3"
                  style={{ width: 15, position: "absolute", zIndex: 1 }}
                />
              </div>
              <Input
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="editProfileInput"
              />
            </div>
            <img
              src={textColor === "white" ? down_arrow2 : down_arrow4}
              className="me-3"
              style={{ width: 20 }}
            />
          </div>
        </div>
        <div>
          {filterization.map((e, i) => {
            return (
              <div
                className="d-flex justify-content-between p-4"
                style={{ borderBottom: "1px solid #272727" }}
                key={i}
              >
                <span className="light-grey">{e}</span>
                <img src={left_arrow} className="" style={{ width: 10 }} />
              </div>
            );
          })}
        </div>
        <div className="d-flex justify-content-center mt-5 mb-3">
          <div style={{ width: 280 }} className="me-3">
            <ButtonComponent radius={5} text={"Cancel"} />
          </div>
          <div style={{ width: 280 }} className="ms-3">
            <ButtonComponent radius={5} green text={"Save"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
