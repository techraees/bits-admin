import React from "react";
import "./css/index.css";
import { NavbarComponent } from "../../components";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button } from "antd";

const Settings = () => {
  return (
    <div className="bg-white2 pb-4">
      <NavbarComponent lightNav headerTxt={"Settings"} selectedKey={"7"} />
      <div
        className="container radius1 bg-white p-4"
        style={{ marginTop: 65 }}
      >
        <div className="row">
          <div className="col-lg-6">
            <div className="bg-white2 p-3 radius1" style={{height:500}}>
              <span style={{ fontSize: 18 }} className="semi-bold">
                Edit Profile
              </span>
              <div className="light-grey-border-bottom my-3"></div>
              <div className="my-4">
                <span>Name</span>
                <Input
                  placeholder="Write Name Here"
                  className="mt-1 inputStyle"
                />
              </div>
              <div className="my-4">
                <span>Current Password</span>
                <Input.Password
                  className="mt-1 inputStyle"
                  placeholder="Write Password Here"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </div>
              <div className="my-4">
                <span>Change Password</span>
                <Input.Password
                  className="mt-1 inputStyle"
                  placeholder="Write Password Here"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </div>
              <div className="d-flex mx-5">
                <Button className="bg-orange white settingScreenBtns me-2">
                  Cancel
                </Button>
                <Button className="bg-blue white settingScreenBtns ms-2">
                  Save
                </Button>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="bg-white2 p-3 radius1" style={{height:500}}>
              <span style={{ fontSize: 18 }} className="semi-bold">
                Assign New Admin Role
              </span>
              <div className="light-grey-border-bottom my-3"></div>
              <div className="my-4">
                <span>Name</span>
                <Input
                  placeholder="Write Name Here"
                  className="mt-1 inputStyle"
                />
              </div>
              <div className="my-4">
                <span>Email</span>
                <Input
                  placeholder="Write Email Here"
                  className="mt-1 inputStyle"
                />
              </div>
              <div className="d-flex justify-content-center">
                <Button
                  style={{ width: "40%" }}
                  className="bg-black white settingScreenBtns"
                >
                  Send Request
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;