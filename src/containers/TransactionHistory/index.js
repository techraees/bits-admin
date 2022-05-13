import React, { useState } from "react";
import {
  down_arrow,
  metamask,
  paypal,
  profile_large,
  up_arrow,
} from "../../assets";
import { NavbarComponent } from "../../components";
import "./css/index.css";
import { Menu, Dropdown, Button, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryStack,
} from "victory";
import { useSelector } from "react-redux";

const TransactionHistory = () => {
  const [dropdownValue, setDropdownValue] = useState("Last Week");
  let transactionsData = [
    {
      title: "Deposit",
      category: "Paypal",
      price: "$405",
      arrow: up_arrow,
    },
    {
      title: "Deposit",
      category: "Metamask",
      price: "$405",
      arrow: up_arrow,
    },
    {
      title: "Withdraw",
      category: "Paypal",
      price: "$405",
      arrow: down_arrow,
    },
    {
      title: "Withdraw",
      category: "Metamask",
      price: "$405",
      arrow: down_arrow,
    },
    {
      title: "Deposit",
      category: "Paypal",
      price: "$405",
      arrow: up_arrow,
    },
    {
      title: "Deposit",
      category: "Paypal",
      price: "$405",
      arrow: up_arrow,
    },
    {
      title: "Withdraw",
      category: "metamask",
      price: "$405",
      arrow: down_arrow,
    },
  ];
  const backgroundTheme = useSelector(
    (state) => state.app.theme.backgroundTheme
  );
  const textColor = useSelector((state) => state.app.theme.textColor);
  const textColor2 = useSelector((state) => state.app.theme.textColor2);
  const bgColor2 = useSelector((state) => state.app.theme.bgColor2);
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
  const data2012 = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 },
  ];

  const data2013 = [
    { quarter: 1, earnings: 15000 },
    { quarter: 2, earnings: 12500 },
    { quarter: 3, earnings: 19500 },
    { quarter: 4, earnings: 13000 },
  ];

  const data2014 = [
    { quarter: 1, earnings: 11500 },
    { quarter: 2, earnings: 13250 },
    { quarter: 3, earnings: 20000 },
    { quarter: 4, earnings: 15500 },
  ];

  const data2015 = [
    { quarter: 1, earnings: 18000 },
    { quarter: 2, earnings: 13250 },
    { quarter: 3, earnings: 15000 },
    { quarter: 4, earnings: 12000 },
  ];

  return (
    <div className={`${backgroundTheme} pb-2`}>
      <NavbarComponent selectedKey={"6"} headerText={"Transaction History"} />
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
        {/* <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
          <VictoryAxis
            tickValues={[1, 2, 3, 4]}
            tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
          />
          <VictoryAxis dependentAxis tickFormat={(x) => `$${x / 1000}k`} />
          <VictoryStack>
            <VictoryBar data={data2012} x="quarter" y="earnings" />
            <VictoryBar data={data2013} x="quarter" y="earnings" />
            <VictoryBar data={data2014} x="quarter" y="earnings" />
            <VictoryBar data={data2015} x="quarter" y="earnings" />
          </VictoryStack>
        </VictoryChart> */}
        <div className={`transactionsList my-5 ${bgColor2}`}>
          <h3 className={`${textColor} pt-4`} style={{ textAlign: "center" }}>
            Transactions
          </h3>
          {transactionsData.map((e, i) => {
            return (
              <div
                key={i}
                className="d-flex justify-content-between py-3 mx-5"
                style={{
                  borderBottom: "1px solid #2d2d2d",
                  alignItems: "center",
                }}
              >
                <div>
                  <span className={textColor2} style={{ fontSize: 18 }}>
                    {e.title} 
                  </span>
                  <div>
                    <img
                      src={e.category === "Paypal" ? paypal : metamask}
                      style={{ width: 15 }}
                    />
                    <span style={{ fontSize: 12 }} className="light-blue ms-2">
                      {e.category}
                    </span>
                  </div>
                </div>
                <div>
                  <span className={`${textColor} me-2`}>$405</span>
                  <img src={e.arrow} style={{ width: 10 }} />
                </div>
              </div>
            );
          })}
          <div
            className="d-flex justify-content-center py-3 cursor"
            style={{ textDecoration: "underline" }}
          >
            <span className="red-gradient-color">View All</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
