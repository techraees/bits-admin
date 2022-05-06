import React, { useState } from "react";
import "./css/index.css";
import { Menu, Button } from "antd";
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from "@ant-design/icons";
import {
  collection,
  gallery,
  home2,
  marketplace,
  right_arrow,
  history,
  plus,
  payment,
  setting,
} from "../../assets";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("Home", "1", <img src={home2} />),
  getItem("My Collection", "2", <img src={collection} />),
  getItem("Emote Video Gallery", "3", <img src={gallery} />),
  getItem("NFT Marketplace", "4", <img src={marketplace} />),
  getItem("Mint NFT", "5", <img src={right_arrow} />),
  getItem("Transaction History", "sub1", <img src={history} />, [
    getItem("Option 6", "6"),
    getItem("Option 7", "7"),
    getItem("Option 8", "8"),
  ]),
  getItem("Create Emote", "9", <img src={plus} />),
  getItem("Payment", "10", <img src={payment} />),
  getItem("Settings", "sub2", <img src={setting} />, [
    getItem("Option 11", "11"),
    getItem("Option 12", "12"),
  ]),
];

const MenuComponent = ({ menuHandle }) => {
  return (
    <div
      style={{
        width: 256,
        position: "absolute",
      }}
    >
      <Menu
        className="manuStyle"
        defaultSelectedKeys={["1"]}
        // defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={menuHandle}
        items={items}
      />
    </div>
  );
};

export default MenuComponent;
