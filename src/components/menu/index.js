import React, { useState } from "react";
import "./css/index.css";
import { Menu } from "antd";
import {
  folder,
  home,
  logo,
  menu_icon,
  paper,
  pen,
  settings,
  user,
  message,
} from "../../assets";
import { useNavigate } from "react-router-dom";

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
  // getItem(
  //   <img src={menu_icon}/>,
  //   "10",
  //   <>
  //     <img src={logo} />
  //     <span>BITS</span>
  //   </>
  // ),
  getItem("Dashboard", "1", <img src={home} />),
  getItem("User Information", "2", <img src={user} />),
  getItem("Data Section", "3", <img src={folder} />),
  getItem("Admin Support", "4", <img src={message} />),
  getItem("Payment", "5", <img src={paper} />),
  getItem("Previous Notes", "6", <img src={pen} />),
  getItem("Settings", "7", <img src={settings} />),
];

const MenuComponent = ({ menuHandle, selectedKey, className }) => {
  let navigate = useNavigate();
  return (
    <div
      className={`${className}`}
      style={{
        width: 256,
        // position:"absolute"
        zIndex: 1,
        top: 58,
        overflow: "auto",
        position: "fixed",
        left: 0,
      }}
    >
      <Menu
        className="manuStyle bg-dark-blue2"
        defaultSelectedKeys={[selectedKey]}
        mode="inline"
        theme="dark"
        inlineCollapsed={menuHandle}
        items={items}
        onSelect={(item) => {
          item.key === "1" && navigate("/");
          item.key === "2" && navigate("/user-information");
          item.key === "3" && navigate("/data-section");
          item.key === "4" && navigate("/admin-support");
          item.key === "5" && navigate("/payment");
          item.key === "6" && navigate("/previous-notes");
          item.key === "7" && navigate("/settings");
        }}
      />
    </div>
  );
};

export default MenuComponent;
