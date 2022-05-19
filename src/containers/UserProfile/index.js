import React from "react";
import "./css/index.css";
import { NavbarComponent, UserVideoCard } from "../../components";
import {
  left_arrow,
  plus5,
  profile_large,
  location,
  user3,
  message3,
  call,
  location_large,
  calender,
  flag,
} from "../../assets";
import { Menu, Dropdown, Button, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

const UserProfile = () => {
  const profileDetails = [
    {
      icon: user3,
      title: "User name",
      data: "Snap_Boggie12",
    },
    {
      icon: message3,
      title: "Email",
      data: "Snapboggie@johndoe.com",
    },
    {
      icon: call,
      title: "Contact Number",
      data: "1 (123) 456 7890",
    },
    {
      icon: location_large,
      title: "Address",
      data: "Boston, MA (USA)",
    },
    {
      icon: calender,
      title: "Date of Birth",
      data: "01/12/1992",
    },
    {
      icon: flag,
      title: "Country",
      data: "United States",
    },
  ];
  const menu = (
    <Menu
      onClick={(e) => console.log(e)}
      items={[
        {
          label: "1st menu item",
          key: "1",
        },
        {
          label: "2nd menu item",
          key: "2",
        },
      ]}
    />
  );
  let cardsData = [
    {
      videoUrl: "https://www.youtube.com/watch?v=9xwazD5SyVg",
      name: "Speedy Walkovers",
    },
    {
      videoUrl: "https://www.youtube.com/watch?v=9xwazD5SyVg",
      name: "Speedy Walkovers",
    },
    {
      videoUrl: "https://www.youtube.com/watch?v=9xwazD5SyVg",
      name: "Speedy Walkovers",
    },
    {
      videoUrl: "https://www.youtube.com/watch?v=9xwazD5SyVg",
      name: "Speedy Walkovers",
    },
    {
      videoUrl: "https://www.youtube.com/watch?v=9xwazD5SyVg",
      name: "Speedy Walkovers",
    },
    {
      videoUrl: "https://www.youtube.com/watch?v=9xwazD5SyVg",
      name: "Speedy Walkovers",
    },
    {
      videoUrl: "https://www.youtube.com/watch?v=9xwazD5SyVg",
      name: "Speedy Walkovers",
    },
    {
      videoUrl: "https://www.youtube.com/watch?v=9xwazD5SyVg",
      name: "Speedy Walkovers",
    },
    {
      videoUrl: "https://www.youtube.com/watch?v=9xwazD5SyVg",
      name: "Speedy Walkovers",
    },
  ];
  return (
    <div className="bg-white2">
      <NavbarComponent lightNav headerTxt={"User Profile"} selectedKey={"2"} />
      <div
        className="container py-3 bg-white radius1"
        style={{ marginTop: 65 }}
      >
        <div className="p-3">
          <div className="d-flex">
            <h5 className="black m-0 me-4">Profile Information </h5>
            <span
              className="mx-4"
              style={{ border: "1px solid #D54343" }}
            ></span>
            <div className="cursor mx-4 d-flex center">
              <img src={plus5} />
              <span className="ms-2">Add a Note</span>
            </div>
            <div className="cursor mx-4 d-flex center">
              <img src={left_arrow} />
              <span className="ms-2">Previous Notes</span>
            </div>
          </div>
          <div className="light-grey-border-bottom my-3"></div>
          <div className="d-flex center justify-content-between">
            <div
              className="d-flex profileImageContainer"
              style={{ alignItems: "center" }}
            >
              <img src={profile_large} className="collectionImage" />
              <div className="userNameView">
                <h3 className="red3 semi-bold">Snap Boogie</h3>
                <div className="d-flex mb-1">
                  <h5 className="m-0 black">Boston, MA (USA)</h5>
                  <img className="ms-2" src={location} />
                </div>
                <span className="black">
                  (Snap Boggie is a Professional Dancer){" "}
                </span>
                <div style={{ width: "60%" }} className="mt-4">
                  <Button className="bg-blue radius2 white">
                    Send Notifications
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <Button className="videoCardBtns bg-black radius1 mb-2 white">
                Block
              </Button>
              <Button className="videoCardBtns bg-orange radius1 white">
                Remove
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-white2 px-5 py-3 row">
          {profileDetails.map((e, i) => {
            return (
              <div key={i} className="col-lg-4 my-3 profileDetailsMobView">
                <div className="d-flex center">
                  <div className="profileIconStyle">
                    <img src={e.icon} />
                  </div>
                  <div className="ms-4">
                    <h5 className="red3 mb-1 m-0">{e.title}</h5>
                    <span className="light-grey2">{e.data}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="p-3">
          <div className="d-flex justify-content-between">
            <h5 className="black">User’s videos</h5>
            <Dropdown overlay={menu}>
              <Button className="dropdownStyle">
                <Space>
                  Recent
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
          <div className="row my-4">
            {cardsData.map((e, i) => {
              return (
                <UserVideoCard key={i} videoUrl={e.videoUrl} name={e.name} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
