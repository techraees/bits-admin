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
import "./css/index.css";

const NavbarComponent = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbarBgColor navbar-dark bg-dark">
        <div className="container-fluid">
          <img
            onClick={toggleCollapsed}
            src={menu_icon}
            className="cursor mx-4"
          />
          <div className="d-flex justify-content-center mx-5 logoView">
            <img src={logo_small} className="cursor mx-5" />
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
              <li className="nav-item mx-3">
                <a className="nav-link  d-flex" aria-current="page" href="/">
                  <img src={search} className="mx-2" alt="" />
                </a>
              </li>
              <li className="nav-item mx-3">
                <a className="nav-link  d-flex" aria-current="page" href="/">
                  <img src={bell} className="mx-2" alt="" />
                </a>
              </li>
              <li className="nav-item mx-3">
                <a className="nav-link d-flex" aria-current="page" href="/">
                  <span className="me-2">Snap</span>
                  <img src={profile} className="mx-2" alt="" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <MenuComponent menuHandle={collapsed} />
    </>
  );
};

export default NavbarComponent;
