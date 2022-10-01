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
import { useNavigate, NavLink } from "react-router-dom";
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
            className="cursor mx-3"
            style={{ width: 50, height: 50 }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-3" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`d-flex align-items-center justify-content-between`}>
            <NavLink to="/collections" className="white d-flex">
              <img
                src={home}
                className="mx-2"
                style={{ width: "100%", height: "auto" }}
              />
              <span>Home</span>
            </NavLink>
            <Nav.Link className="white">Emote Video Gallery</Nav.Link>
            <Nav.Link className="white">NFT Marketplace</Nav.Link>
            <Nav.Link className="white" onClick={() => navigate("/about-us")}>
              About
            </Nav.Link>
            <NavLink to="/contact" className="white">
              Contact
            </NavLink>
          </Nav>
          <Nav className="ms-auto">
            {login ? (
              <div className="d-flex align-items-center justify-content-center">
                <Nav.Link className="white mx-2" onClick={handleLogin}>
                  Login
                </Nav.Link>
                <Nav.Link
                  className="white mx-2 walletBtn d-flex justify-content-center align-items-center"
                  onClick={handleLogin}
                >
                  <span>Connect Wallet</span>
                </Nav.Link>
              </div>
            ) : (
              <div className="d-flex align-items-center justify-content-center">
                <Nav.Link className="white mx-1">
                  {" "}
                  <img src={search} className="" alt="" />
                </Nav.Link>
                <Nav.Link className="white mx-1">
                  {" "}
                  <img src={bell} className="" alt="" />
                </Nav.Link>
                <Nav.Link className="white mx-1 d-flex">
                  {" "}
                  <span className="me-2">Snap</span>
                  <img src={profile} className="" alt="" />
                </Nav.Link>
                <Nav.Link className="white mx-1">
                  {" "}
                  <SwitchBtn toggleBtn={toggleBtn} />
                </Nav.Link>
              </div>
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
