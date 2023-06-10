import React, { useEffect, useState } from "react";
import {
  bell,
  home,
  logo,
  logo_small,
  menu_icon,
  profile,
  search,
  eth,
  polygon,
} from "../../assets/index";
import MenuComponent from "../menu";
import SwitchBtn from "../switchBtn";
import "./css/index.css";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { useNavigate, NavLink } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaEthereum } from "react-icons/fa";
import { CiWallet } from "react-icons/ci";
import { useLazyQuery } from "@apollo/client";
import { GET_PROFILE, LOGIN_USER } from "../../gql/queries";
import profileimg from "../../assets/images/profile1.svg";
import environment from "../../environment";
import { Modal } from "antd";
import LogoutModal from "../logoutModal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

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

  const [profile, { loading, error, data }] = useLazyQuery(GET_PROFILE, {
    fetchPolicy: "network-only",
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { userData } = useSelector((state) => state.address.userData);

  const full_name = userData?.full_name;
  const userProfile = userData?.profileImg;
  const imgPath = environment.BACKEND_BASE_URL + "/" + userProfile;

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      const GetProfile = data?.GetProfile;

      const id = GetProfile?.id;
      const user_address = GetProfile?.user_address;
      const full_name = GetProfile?.full_name;
      const country = GetProfile?.country;
      const bio = GetProfile?.bio;
      const profileImg = GetProfile?.profileImg;
      const token = GetProfile?.token;

      dispatch({
        type: "NFT_ADDRESS",
        userData: {
          address: user_address,
          full_name: full_name,
          country: country,
          bio: bio,
          profileImg: profileImg,
          id,
          token,
          isLogged: true,
        },
      });
    }
  }, [data]);

  // console.log(menuBar, "menu");

  useEffect(() => {
    let token = localStorage.getItem("token");
    console.log("token", token);
    if (token) {
      profile({
        variables: {
          token: token,
        },
      });
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  console.log("err", error?.message);
  useEffect(() => {
    if (error?.message == "jwt expired") {
      // navigate("/login");
    }
  }, [error]);

  return (
    <>
      <Navbar
        className={`${dashboardNav ? "dashboardNavBgColor" : "navbarBgColor"}`}
        expand="lg"
        sticky="top"
        style={{ zIndex: 1 }}
      >
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={false}
          className="logoutModal"
          width={300}
          centered={width < 992 && true}
        >
          <LogoutModal />
        </Modal>
        <Navbar.Brand>
          <img
            onClick={toggleCollapsed}
            src={menu_icon}
            className="cursor ms-4 menuBarWebView"
          />
        </Navbar.Brand>
        <Container>
          {full_name && (
            <img
              onClick={handleMenu}
              src={menu_icon}
              className="cursor ms-4 menuBarMobView"
            />
          )}
          <Navbar.Brand>
            <div className="nav-logo">
              <NavLink to="/" className="white d-flex">
                <img
                  src={logo}
                  className="cursor"
                  style={{ width: 50, height: 50 }}
                />
              </NavLink>
            </div>
          </Navbar.Brand>
          <div className="topmenu">
            <div className="d-flex align-items-center justify-content-center loginbtn">
              {!full_name ? (
                <>
                  <div className="connentbtn">
                    <Nav.Link className="white mx-2 " onClick={handleLogin}>
                      Login
                    </Nav.Link>
                    <Nav.Link
                      className="white mx-2  walletBtn d-flex justify-content-center align-items-center"
                      onClick={handleLogin}
                    >
                      <span>
                        {/* {width < 575 ? <CiWallet /> : "Connect Wallet"} */}
                      </span>
                    </Nav.Link>
                  </div>
                  <div className="connectIcon d-flex">
                    <Nav.Link className="white" onClick={handleLogin}>
                      Login
                    </Nav.Link>
                    <Nav.Link
                      className="white mx-2 walletBtn d-flex justify-content-center align-items-center"
                      onClick={handleLogin}
                    >
                      <span>
                        {/* {width < 575 ? <CiWallet /> : "Connect Wallet"} */}
                        Connect Wallet
                      </span>
                    </Nav.Link>
                    <div style={{ margin: "5px 0 0 1rem" }}>
                      <SwitchBtn toggleBtn={toggleBtn} />
                    </div>
                  </div>
                </>
              ) : (
                <div className="d-flex align-items-center justify-content-center">
                  <Nav.Link className="white mx-1 d-flex" onClick={showModal}>
                    <span className="me-2 mt-1">{full_name}</span>
                    {userProfile ? (
                      <img
                        src={imgPath}
                        width={30}
                        className=""
                        style={{ borderRadius: "50%" }}
                        alt=""
                      />
                    ) : (
                      <img
                        src={profileimg}
                        width={30}
                        className=""
                        style={{ borderRadius: "50%" }}
                        alt=""
                      />
                    )}
                  </Nav.Link>
                  <Nav.Link className="white">
                    <SwitchBtn toggleBtn={toggleBtn} />
                  </Nav.Link>
                </div>
              )}
            </div>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-3" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className={`d-flex align-items-center justify-content-between first-nav`}
            >
              <NavLink to="/" className="white d-flex">
                <img
                  src={home}
                  className="mx-2"
                  style={{ width: "100%", height: "auto" }}
                />
                <span>Home</span>
              </NavLink>
              <Nav.Link
                className="white"
                onClick={() => navigate("/video-gallery")}
              >
                Emote-Video gallery
              </Nav.Link>
              <Nav.Link
                className="white"
                onClick={() => navigate("/marketplace")}
              >
                NFT Marketplace
              </Nav.Link>
              <Nav.Link className="white" onClick={() => navigate("/about-us")}>
                About
              </Nav.Link>
              <NavLink to="/contact" className="white">
                Contact
              </NavLink>
            </Nav>
            <div className="chainDiv">
              <div className="leftChainDiv">Chains</div>
              <div className="rightChainDiv">
                <FaEthereum cursor="pointer" />
                <img className="ethIcon" src={polygon} />
              </div>
            </div>
            <Nav className="ms-auto bottom-nav">
              {!full_name ? (
                <div className="d-flex align-items-center justify-content-center navbar-menu1">
                  <Nav.Link className="white mx-2" onClick={handleLogin}>
                    Login
                  </Nav.Link>
                  <Nav.Link
                    className="white mx-2 walletBtn d-flex justify-content-center align-items-center"
                    onClick={handleLogin}
                  >
                    <span>Connect Wallet</span>
                  </Nav.Link>
                  <SwitchBtn toggleBtn={toggleBtn} />
                </div>
              ) : (
                <div className="d-flex align-items-center justify-content-center">
                  <Nav.Link className="white mx-1">
                    <img src={search} className="" alt="" />
                  </Nav.Link>
                  <Nav.Link className="white mx-1">
                    <img src={bell} className="" alt="" />
                  </Nav.Link>
                  <Nav.Link className="white mx-1 d-flex" onClick={showModal}>
                    <span className="me-2 mt-1">{full_name}</span>
                    {profileimg ? (
                      <img
                        src={imgPath}
                        width={30}
                        className=""
                        style={{ borderRadius: "50%" }}
                        alt=""
                      />
                    ) : (
                      <img
                        src={profileimg}
                        width={30}
                        className=""
                        style={{ borderRadius: "50%" }}
                        alt=""
                      />
                    )}
                  </Nav.Link>
                  <Nav.Link className="white">
                    <SwitchBtn toggleBtn={toggleBtn} />
                  </Nav.Link>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {login && (
        <MenuComponent
          toggleCollapsed={toggleCollapsed}
          selectedKey={selectedKey}
          menuHandle={collapsed}
          className="menuBarWebView"
        />
      )}
      {!login && (
        <MenuComponent
          toggleCollapsed={toggleCollapsed}
          selectedKey={selectedKey}
          menuHandle={collapsed}
          className="menuBarWebView"
        />
      )}
      {menuBar && (
        <MenuComponent
          selectedKey={selectedKey}
          toggleCollapsed={toggleCollapsed}
          menuHandle={true}
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
