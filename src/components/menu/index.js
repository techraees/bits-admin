import React from "react";
import "./css/index.css";
import { Menu } from "antd";
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
  transaction_history,
  selling_history,
  purchase_history,
  account_settings,
  help_center,
  lock,
  about,
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
  getItem("Home", "1", <img src={home2} />),
  getItem("My Collection", "2", <img src={collection} />),
  getItem("Emote Video Gallery", "3", <img src={gallery} />),
  getItem("NFT Marketplace", "4", <img src={marketplace} />),
  getItem("Mint NFT", "5", <img src={right_arrow} />),
  getItem("Transaction History", "sub1", <img src={history} />, [
    getItem("Transaction History", "6", <img src={transaction_history} />),
    getItem("Selling History", "7", <img src={selling_history} />),
    getItem("Purchase History", "8", <img src={purchase_history} />),
  ]),
  getItem("Create Emote", "9", <img src={plus} />),
  getItem("Payment", "10", <img src={payment} />),
  getItem("Settings", "sub2", <img src={setting} />, [
    getItem("Account Settings", "11", <img src={account_settings} />),
    getItem("Help Center", "12", <img src={help_center} />),
    getItem("Privacy & Security", "13", <img src={lock} />),
    getItem("About", "14", <img src={about} />),
  ]),
];

const MenuComponent = ({ menuHandle, selectedKey, className }) => {
  let navigate = useNavigate();
  return (
    <div
      className={className}
      style={{
        width: 256,
        // position: "absolute",
        zIndex: 1,
        top: 58,
        overflow: "auto",
        position: "fixed",
        left: 0,
      }}
    >
      <Menu
        className="manuStyle"
        defaultSelectedKeys={[selectedKey]}
        mode="inline"
        theme="dark"
        inlineCollapsed={menuHandle}
        items={items}
        onSelect={(item) => {
          item.key === "1" && navigate("/collections");
          item.key === "2" && navigate("/collections");
          item.key === "3" && navigate("/video-gallery");
          item.key === "6" && navigate("/transaction-history");
          item.key === "7" && navigate("/selling-history");
          item.key === "8" && navigate("/purchase-history");
          item.key === "10" && navigate("/payment");
          item.key === "11" && navigate("/account-settings");
          item.key === "12" && navigate("/help-center");
          item.key === "13" && navigate("/privacy-security");
        }}
      />
    </div>
  );
};

export default MenuComponent;
