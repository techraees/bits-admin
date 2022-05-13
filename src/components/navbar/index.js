import React, { useState } from "react";
import {
  bell,
  home,
  logo_small,
  menu_icon,
  profile,
  search,
} from "../../assets/index";
import MenuComponent from "../menu";
import SwitchBtn from "../switchBtn";
import "./css/index.css";
import { useSelector } from "react-redux";

const NavbarComponent = ({ headerText, selectedKey }) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const headerTheme = useSelector((state) => state.app.theme.headerTheme);
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbarBgColor navbar-dark bg-dark">
        <div className="container-fluid">
          <img
            onClick={toggleCollapsed}
            src={menu_icon}
            className="cursor mx-4"
          />
          <div className="d-flex justify-content-center me-5 ms-4 logoView">
            <img
              src={logo_small}
              className="cursor mx-5"
              style={{ width: 50, height: 50 }}
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item mx-3">
                <a
                  className="nav-link active d-flex"
                  aria-current="page"
                  href="/"
                >
                  <img src={home} className="mx-2" alt="" />
                  <span>Home</span>
                </a>
              </li>
              <li className="nav-item mx-3">
                <a className="nav-link" href="/">
                  Emote Video Gallery
                </a>
              </li>
              <li className="nav-item mx-3">
                <a className="nav-link" href="/">
                  NFT Marketplace
                </a>
              </li>
              <li className="nav-item mx-3">
                <a className="nav-link" href="/">
                  About
                </a>
              </li>
              <li className="nav-item mx-3">
                <a className="nav-link" href="/">
                  Contact
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mx-1">
                <a
                  className="nav-link d-flex mt-1"
                  aria-current="page"
                  href="/"
                >
                  <img src={search} className="mx-2" alt="" />
                </a>
              </li>
              <li className="nav-item mx-1">
                <a className="nav-link d-flex" aria-current="page" href="/">
                  <img src={bell} className="mx-2" alt="" />
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link d-flex" aria-current="page" href="/">
                  <span className="me-2">Snap</span>
                  <img src={profile} className="mx-2" alt="" />
                </a>
              </li>
              <li
                className="nav-item mx-2 d-flex"
                style={{ alignItems: "center" }}
              >
                <SwitchBtn />
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <MenuComponent selectedKey={selectedKey} menuHandle={collapsed} />
      {headerText && (
        <div
          className={`${headerTheme} p-2`}
          style={{ textAlign: "center", marginTop: 58 }}
        >
          <span className="light-grey fs-5">{headerText}</span>
        </div>
      )}
    </div>
  );
};

export default NavbarComponent;
