import React, { useState } from "react";
import { profile2, profile_large } from "../../assets";
import { NavbarComponent, Transactions } from "../../components";
import { Dropdown, Button, Space, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./css/index.css";
import { useSelector } from "react-redux";

const SellingHistory = () => {
  const [dropdownValue, setDropdownValue] = useState("Last Week");
  let sellingData = [
    {
      image: profile2,
      name: "Speedy Walkover",
      buyerName: "Marie",
      date: "10/22/2021",
      price: "$300",
    },
    {
      image: profile2,
      name: "Speedy Walkover",
      buyerName: "Marie",
      date: "10/22/2021",
      price: "$300",
    },
    {
      image: profile2,
      name: "Speedy Walkover",
      buyerName: "Marie",
      date: "10/22/2021",
      price: "$300",
    },
    {
      image: profile2,
      name: "Speedy Walkover",
      buyerName: "Marie",
      date: "10/22/2021",
      price: "$300",
    },
    {
      image: profile2,
      name: "Speedy Walkover",
      buyerName: "Marie",
      date: "10/22/2021",
      price: "$300",
    },
    {
      image: profile2,
      name: "Speedy Walkover",
      buyerName: "Marie",
      date: "10/22/2021",
      price: "$300",
    },
    {
      image: profile2,
      name: "Speedy Walkover",
      buyerName: "Marie",
      date: "10/22/2021",
      price: "$300",
    },
  ];
  const backgroundTheme = useSelector(
    (state) => state.app.theme.backgroundTheme
  );
  const textColor = useSelector((state) => state.app.theme.textColor);
  const menu = (
    <Menu
      onClick={(e) => setDropdownValue(e.key)}
      items={[
        {
          label: "Last Week",
          key: "Last Week",
        },
        {
          label: "Last Month",
          key: "Last Month",
        },
        {
          label: "Last Year",
          key: "Last Year",
        },
      ]}
    />
  );
  return (
    <div className={`${backgroundTheme}`}>
      <NavbarComponent
        toggleBtn={textColor === "white" ? true : false}
        selectedKey={"7"}
        headerText={"Selling History"}
      />
      <div className="container">
        <div
          className="d-flex justify-content-between py-5 transactionFirstView"
          style={{ alignItems: "center" }}
        >
          <div className="d-flex" style={{ alignItems: "center" }}>
            <img src={profile_large} style={{ width: 70, height: 70 }} />
            <h4 className="white ms-4 semi-bold red-gradient-color">
              Snap Boogie
            </h4>
          </div>
          <Dropdown overlay={menu} className="dropdownView mobMargin">
            <Button>
              <Space>
                {dropdownValue}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
        <div style={{ border: "1px solid #D54343" }}></div>
        <Transactions checkIcon data={sellingData} />
      </div>
    </div>
  );
};

export default SellingHistory;
