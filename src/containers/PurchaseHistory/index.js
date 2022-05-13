import React, { useState } from "react";
import { profile_large } from "../../assets";
import { NavbarComponent, Transactions } from "../../components";
import { Dropdown, Button, Space, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./css/index.css";
import { useSelector } from "react-redux";

const PurchaseHistory = () => {
  const [dropdownValue, setDropdownValue] = useState("Last Week");
  let sellingData = [
    {
      name: "Speedy Walkover",
      date: "10/22/2021",
      price: "$300",
    },
    {
      name: "Speedy Walkover",
      date: "10/22/2021",
      price: "$300",
    },
    {
      name: "Speedy Walkover",
      date: "10/22/2021",
      price: "$300",
    },
    {
      name: "Speedy Walkover",
      date: "10/22/2021",
      price: "$300",
    },
    {
      name: "Speedy Walkover",
      date: "10/22/2021",
      price: "$300",
    },
    {
      name: "Speedy Walkover",
      date: "10/22/2021",
      price: "$300",
    },
    {
      name: "Speedy Walkover",
      date: "10/22/2021",
      price: "$300",
    },
  ];
  const backgroundTheme = useSelector(
    (state) => state.app.theme.backgroundTheme
  );
  const textColor = useSelector((state) => state.app.theme.textColor);
  const textColor2 = useSelector((state) => state.app.theme.textColor2);
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
      <NavbarComponent selectedKey={"8"} headerText={"Purchase History"} />
      <div className="container">
        <div
          className="d-flex justify-content-between py-5 transactionFirstView"
          style={{ alignItems: "center" }}
        >
          <div className="d-flex">
            <img src={profile_large} style={{ width: 70, height: 70 }} />
            <div className="ms-3">
              <span className={textColor2}>Hi,</span>
              <p className={textColor}>Snap Boogie</p>
            </div>
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
        <Transactions data={sellingData} />
      </div>
    </div>
  );
};

export default PurchaseHistory;
