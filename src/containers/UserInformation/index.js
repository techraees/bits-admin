import React from "react";
import "./css/index.css";
import { NavbarComponent } from "../../components";
import { filter, menu_icon2, plus, profile, sort } from "../../assets";
import { Table, Dropdown, Menu, Button, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const UserInformation = () => {
  const navigate = useNavigate();
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: () => (
        <div className="d-flex center">
          <img src={profile} />
          <div className="ms-3">
            <span className="semi-bold black">Snap</span>
            <p className="light-grey m-0">Updated 1 day ago</p>
          </div>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contact Info",
      dataIndex: "contactInfo",
    },
    {
      title: "Country",
      dataIndex: "country",
    },
    {
      title: "Details",
      dataIndex: "details",
      render: () => (
        <Button
          className="bg-blue white"
          style={{ borderRadius: 20, width: "70%" }}
        >
          Send Notifications
        </Button>
      ),
    },
    {
      title: "",
      dataIndex: "icon",
      render: () => (
        <Dropdown className="ms-4" overlay={profileMenu}>
          <img style={{ cursor: "pointer" }} className="p-2" src={menu_icon2} />
        </Dropdown>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "Snap",
      email: "xyz@gmail.com",
      contactInfo: "+1 22330044",
      country: "Pakistan",
    },
    {
      key: "2",
      name: "Haily",
      email: "xyz@gmail.com",
      contactInfo: "+1 22330044",
      country: "USA",
    },
    {
      key: "3",
      name: "Haily",
      email: "xyz@gmail.com",
      contactInfo: "+1 22330044",
      country: "USA",
    },
    {
      key: "4",
      name: "Haily",
      email: "xyz@gmail.com",
      contactInfo: "+1 22330044",
      country: "USA",
    },
    {
      key: "5",
      name: "Haily",
      email: "xyz@gmail.com",
      contactInfo: "+1 22330044",
      country: "USA",
    },
  ];
  const mobileviewcolumns = [
    {
      title: "Name",
      dataIndex: "name",
      render: () => <img src={profile} />,
    },
    {
      title: "Details",
      dataIndex: "details",
      render: () => (
        <Button
          className="bg-blue white"
          style={{ borderRadius: 20, width: "100%" }}
        >
          Send Notifications
        </Button>
      ),
    },
    {
      title: "",
      dataIndex: "icon",
      render: () => (
        <Dropdown className="ms-4" overlay={profileMenu}>
          <img style={{ cursor: "pointer" }} className="p-2" src={menu_icon2} />
        </Dropdown>
      ),
    },
  ];

  const menu = (
    <Menu
      onClick={(e) => console.log(e)}
      items={[
        {
          label: "Creators",
          key: "1",
        },
        {
          label: "Buyers",
          key: "2",
        },
      ]}
    />
  );

  const profileMenu = (
    <Menu
      onClick={(e) => {
        e.key === "1" && navigate("user-profile");
        console.log(e);
      }}
      items={[
        {
          label: "See Profile",
          key: "1",
        },
        {
          label: "Delete",
          key: "2",
        },
        {
          label: "Block",
          key: "3",
        },
      ]}
    />
  );
  return (
    <div className="bg-white2">
      <NavbarComponent
        lightNav
        headerTxt={"User Information"}
        selectedKey={"2"}
      />
      <div
        className="container py-3 bg-white radius1"
        style={{ marginTop: 65 }}
      >
        <div className="d-flex p-4 justify-content-between center">
          <h5 className="m-0">Creators</h5>
          <div className="d-flex center">
            <div>
              <div>
                <span className="blue me-2">Add New User</span>
                <img src={plus} />
              </div>
              <div className="ms-4 mt-1 optionsMobView">
                <img src={sort} className="me-2" />
                <span className="purple">Sort</span>
              </div>
            </div>
            <div>
              <Dropdown className="ms-4" overlay={menu}>
                <Button className="dropdowmStyle">
                  <Space>
                    Creator
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
              <div className="ms-4 mt-1 optionsMobView">
                <img src={filter} className=" me-2" />
                <span className="purple">Filter</span>
              </div>
            </div>
            <div className="ms-4 optionsWebView">
              <img src={sort} className="me-2" />
              <span className="purple">Sort</span>
            </div>
            <div className="ms-4 optionsWebView">
              <img src={filter} className=" me-2" />
              <span className="purple">Filter</span>
            </div>
          </div>
        </div>
        <div className="mx-2 webtable px-3">
          <Table columns={columns} dataSource={data} />
        </div>
        <div className="mx-2 mobtable">
          <Table columns={mobileviewcolumns} dataSource={data} />
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
