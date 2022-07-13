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
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

const NavbarComponent = ({
  headerText,
  selectedKey,
  toggleBtn,
  login,
  dashboardNav,
  center,
}) => {
  const [collapsed, setCollapsed] = useState(true);
  const [menuBar, setMenuBar] = useState(false);
  const navigate = useNavigate();
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const handleMenu = () => {
    setMenuBar(!menuBar);
  };
  const headerTheme = useSelector((state) => state.app.theme.headerTheme);
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <>
      <Navbar
        className={`${dashboardNav ? "dashboardNavBgColor" : "navbarBgColor"}`}
        expand="lg"
        sticky="top"
      >
        {!login && (
          <img
            onClick={toggleCollapsed}
            src={menu_icon}
            className="cursor mx-4 menuBarWebView"
          />
        )}{" "}
        {!login && (
          <img
            onClick={handleMenu}
            src={menu_icon}
            className="cursor mx-4 menuBarMobView"
          />
        )}
        <Navbar.Brand href="#home">
          <img
            src={logo_small}
            className="cursor mx-5"
            style={{ width: 50, height: 50 }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-3" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`${center ? "ms-auto" : "me-auto"}`}>
            <Nav.Link className="white d-flex mx-3">
              <img src={home} className="mx-2" alt="" />
              <span>Home</span>
            </Nav.Link>
            <Nav.Link className="white mx-3">Emote Video Gallery</Nav.Link>
            <Nav.Link className="white mx-3">NFT Marketplace</Nav.Link>
            <Nav.Link
              className="white mx-3"
              onClick={() => navigate("/about-us")}
            >
              About
            </Nav.Link>
            <Nav.Link className="white mx-3">Contact</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {login ? (
              <>
                <Nav.Link className="white mx-3" onClick={handleLogin}>
                  Login
                </Nav.Link>
                <Nav.Link
                  className="white mx-3 walletBtn d-flex justify-content-center align-items-center"
                  onClick={handleLogin}
                >
                  <span>Connect Wallet</span>
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link className="white mx-2">
                  {" "}
                  <img src={search} className="mx-2" alt="" />
                </Nav.Link>
                <Nav.Link className="white mx-2">
                  {" "}
                  <img src={bell} className="mx-2" alt="" />
                </Nav.Link>
                <Nav.Link className="white mx-2 d-flex">
                  {" "}
                  <span className="me-2">Snap</span>
                  <img src={profile} className="mx-2" alt="" />
                </Nav.Link>
                <Nav.Link className="white mx-2">
                  {" "}
                  <SwitchBtn toggleBtn={toggleBtn} />
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {!login && (
        <MenuComponent
          selectedKey={selectedKey}
          menuHandle={collapsed}
          className="menuBarWebView"
        />
      )}
      {menuBar && (
        <MenuComponent
          selectedKey={selectedKey}
          menuHandle={false}
          className="menuBarMobView"
        />
      )}
      {headerText && (
        <div className={`${headerTheme} p-2`} style={{ textAlign: "center" }}>
          <span className="light-grey fs-5">{headerText}</span>
        </div>
      )}
    </>
  );
};

export default NavbarComponent;
