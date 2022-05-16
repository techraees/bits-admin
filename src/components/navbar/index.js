import React, { useState } from "react";
import { bell, menu_icon, profile, search } from "../../assets/index";
import MenuComponent from "../menu";
import { Input } from "antd";
import "./css/index.css";

const NavbarComponent = ({ headerText, selectedKey }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [menuBar, setMenuBar] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const handleMenu = () => {
    setMenuBar(!menuBar);
  };
  return (
    <div>
      <nav
        // style={{ zIndex: 0}}
        className="navbar fixed-top navbar-expand-lg bg-dark-blue2 navbar-dark bg-dark"
      >
        <div className="container-fluid">
          <img
            onClick={toggleCollapsed}
            src={menu_icon}
            className="cursor mx-4 menuBarWebView"
          />
          <img
            onClick={handleMenu}
            src={menu_icon}
            className="cursor mx-4 menuBarMobView"
          />
          <div
            // style={{ width: "50%" }}
            className="d-flex searchStyle bg-dark-blue3"
          >
            <img className="cursor" style={{ width: 15 }} src={search} />
            <Input
              placeholder="Search ..."
              className={`searchStyle bg-dark-blue3`}
            />
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav  ms-auto mb-2 mb-lg-0">
              <li className="nav-item mx-1">
                <a
                  className="nav-link d-flex mt-1"
                  aria-current="page"
                  href="/"
                >
                  <img src={search} className="mt-1" style={{ width: 20 }} />
                </a>
              </li>
              <li className="nav-item mx-1">
                <a className="nav-link d-flex" aria-current="page" href="/">
                  <img src={bell} className="mx-3 mt-2" alt="" />
                </a>
              </li>
              <li className="grey-border my-2"></li>
              <li className="nav-item mx-2">
                <a
                  className="nav-link d-flex center"
                  aria-current="page"
                  href="/"
                >
                  <span className="me-2">Admin</span>
                  <img src={profile} className="mx-2" style={{ width: 35 }} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <MenuComponent
        selectedKey={selectedKey}
        menuHandle={collapsed}
        className="menuBarWebView"
      />
      {/* {menuBar && (
        <MenuComponent
          selectedKey={selectedKey}
          menuHandle={false}
          className="menuBarMobView"
        />
      )} */}
    </div>
  );
};

export default NavbarComponent;
