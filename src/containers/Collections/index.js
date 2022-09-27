import React, { useState } from "react";
import {
  profile_large,
  location,
  upload,
  search,
  AZ,
  grid,
  profile,
  location_dark,
  upload_red,
} from "../../assets";
import {
  ButtonComponent,
  CardCompnent,
  NavbarComponent,
  UploadVideoModal,
} from "../../components";
import "./css/index.css";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Collections = () => {
  const backgroundTheme = useSelector(
    (state) => state.app.theme.backgroundTheme
  );
  const textColor = useSelector((state) => state.app.theme.textColor);
  const textColor2 = useSelector((state) => state.app.theme.textColor2);
  const textColor3 = useSelector((state) => state.app.theme.textColor3);
  const bgColor = useSelector((state) => state.app.theme.bgColor);
  const [uploadVideoModal, setUploadVideoModal] = useState(false);
  let navigate = useNavigate();
  let cardsData = [
    {
      image: profile,
      name: "Speedy Walkovers",
      status: "First Gen Emote",
      videoLink: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      image: profile,
      name: "Speedy Walkovers",
      status: "First Gen Emote",
      videoLink: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      image: profile,
      name: "Speedy Walkovers",
      status: "First Gen Emote",
      videoLink: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      image: profile,
      name: "Speedy Walkovers",
      status: "First Gen Emote",
      videoLink: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      image: profile,
      name: "Speedy Walkovers",
      status: "First Gen Emote",
      videoLink: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      image: profile,
      name: "Speedy Walkovers",
      status: "First Gen Emote",
      videoLink: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      image: profile,
      name: "Speedy Walkovers",
      status: "First Gen Emote",
      videoLink: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      image: profile,
      name: "Speedy Walkovers",
      status: "First Gen Emote",
      videoLink: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
  ];
  return (
    <div className={`${backgroundTheme}`}>
      <NavbarComponent
        toggleBtn={textColor === "white" ? true : false}
        selectedKey={"1"}
      />

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
              <h3 className="red-gradient-color semi-bold">Snap Boogie</h3>
              <div className="d-flex mb-1">
                <h5 className={`m-0 ${textColor}`}>Boston, MA (USA)</h5>
                <img
                  className="ms-2"
                  src={textColor === "white" ? location : location_dark}
                />
              </div>
              <span className={`${textColor2}`}>
                (Snap Boggie is a Professional Dancer){" "}
              </span>
              <div style={{ width: "60%" }} className="mt-4">
                <ButtonComponent
                  onClick={() => navigate("/account-settings/edit-profile")}
                  simple
                  text={"Edit Profile"}
                />
              </div>
            </div>
          </div>
          <UploadVideoModal
            visible={uploadVideoModal}
            onClose={() => setUploadVideoModal(false)}
          />
          <div className="d-flex justify-content-center uploadView1">
            <div
              className="d-flex py-4 uploadView"
              onClick={() => {
                // alert("Modal");
                setUploadVideoModal(true);
              }}
            >
              <img src={textColor === "white" ? upload : upload_red} />
              <p className={`${textColor3} m-0 mt-3`}>Upload Emote Video</p>
            </div>
          </div>
        </div>
        <div style={{ border: "1px solid #B23232" }}></div>
        <div className="my-4 d-flex justify-content-between">
          <div
            style={{ width: "100%" }}
            className={`d-flex searchStyle ${bgColor}`}
          >
            <Input
              placeholder="Search Here..."
              className={`searchStyle ${bgColor}`}
            />
            <img className="me-3 cursor" style={{ width: 15 }} src={search} />
          </div>
          <div
            className={`d-flex ms-3 p-2 ${bgColor}`}
            style={{ borderRadius: 20 }}
          >
            <img src={AZ} className="me-2" style={{ width: 20, height: 20 }} />
            <span
              className="me-2"
              style={{ border: "1px solid #D54343" }}
            ></span>
            <img src={grid} style={{ width: 20, height: 20 }} />
          </div>
        </div>
        <div className="row">
          {cardsData.map((e, i) => {
            return (
              <CardCompnent
                key={i}
                image={e.image}
                status={e.status}
                name={e.name}
                videoLink={e.videoLink}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Collections;
