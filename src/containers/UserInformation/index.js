import React from "react";
import "./css/index.css";
import { NavbarComponent } from "../../components";
import { filter, menu_icon, menu_icon2, plus, sort, user2 } from "../../assets";
import { Table, Dropdown, Menu, Button, Space } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

const UserInformation = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
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
          <img style={{ cursor: "pointer" }} src={menu_icon2} />
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
  ]; // rowSelection object indicates the need for row selection
  const mobileviewcolumns = [
    {
      title: "Billing date",
      dataIndex: "billingDate",
    },
    {
      title: "",
      dataIndex: "download",
      render: () => (
        <span className="green" style={{ cursor: "pointer" }}>
          Download
        </span>
      ),
    },
    {
      title: "",
      dataIndex: "icon",
      render: () => (
        <Dropdown className="ms-4" overlay={menu}>
          <Button className="dropdowmStyle">
            <Space>
              <img style={{ cursor: "pointer" }} src={menu_icon2} />
            </Space>
          </Button>
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
      onClick={(e) => console.log(e)}
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
          <div className="d-flex p-4 justify-content-between">
            <h5 className="m-0">Creators</h5>
            <div className="d-flex center">
              <div>
                <span className="blue me-2">Add New User</span>
                <img src={plus} />
              </div>
              <Dropdown className="ms-4" overlay={menu}>
                <Button className="dropdowmStyle">
                  <Space>
                    Creator
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
              <div className="ms-4">
                <img src={sort} className="me-2" />
                <span className="purple">Sort</span>
              </div>
              <div className="ms-4">
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
