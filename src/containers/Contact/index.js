import React, { useState } from "react";
import {
  profile_large,
  location,
  upload,
  search,
  AZ,
  grid,
  profile,
  location_dark,
  upload_red,
  map_img,
  bits_icon_big,
  location2,
  location_dark2,
  user_icon,
  mail_icon,
  phone_icon,
  send_msg_icon,
  mail_fill_icon,
  phone_fill_icon,
  location_fill_icon,
} from "../../assets";
import {
  ButtonComponent,
  CardCompnent,
  NavbarComponent,
  UploadVideoModal,
  InputComponent,
} from "../../components";
import "./css/index.css";
import { Col, Input, Row, Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Contact = () => {
  const backgroundTheme = useSelector(
    (state) => state.app.theme.backgroundTheme
  );
  const textColor = useSelector((state) => state.app.theme.textColor);
  const textColor2 = useSelector((state) => state.app.theme.textColor2);
  const textColor3 = useSelector((state) => state.app.theme.textColor3);
  const bgColor = useSelector((state) => state.app.theme.bgColor);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`${backgroundTheme}`} style={{ minHeight: "100vh" }}>
      <NavbarComponent
        toggleBtn={textColor === "white" ? true : false}
        selectedKey={""}
        headerText={"Contact"}
      />
      <div style={{ minHeight: "100vh" }}>
        <img src={map_img} style={{ width: "100%", height: "auto" }} />
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          className="contentModal"
          closable={false}
          maskClosable={false}
        >
          <div className="d-flex justify-content-center">
            <img src={bits_icon_big} style={{ width: 100 }} />
          </div>
          <div>
            <Input
              placeholder={"Full Name"}
              className="contactInputsStyle regular"
            />
            <div style={{ position: "absolute" }}>
              <img className="inputIcon" src={user_icon} />
            </div>
          </div>
          <div>
            <Input
              placeholder={"Email"}
              className="contactInputsStyle regular"
            />
            <div style={{ position: "absolute" }}>
              <img src={mail_icon} className="inputIcon" />
            </div>
          </div>
          <div>
            <Input
              placeholder={"Phone"}
              className="contactInputsStyle regular"
            />
            <div style={{ position: "absolute" }}>
              <img src={phone_icon} className="inputIcon" />
            </div>
          </div>
          <div>
            <div className="py-3 px-2">
              <img src={send_msg_icon} style={{ width: 25 }} />
              <span style={{ color: "#b0b0b0" }} className="ms-2">
                Message
              </span>
            </div>
            <Input.TextArea rows={4} className="msgTextArea" />
          </div>
          <div className="mt-4">
            <ButtonComponent height={40} text={"Submit"} />
          </div>
          <Row gutter={{ xs: 8, sm: 16, md: 20, lg: 32 }} className="mt-5 mb-2">
            <Col span={8}>
              <div className="d-flex align-items-center justify-content-center">
                <div className="contactIconsView d-flex align-items-center justify-content-center">
                  <img src={mail_fill_icon} style={{ width: 20 }} />
                </div>
              </div>
              <p
                className={`${textColor2} text-center m-0`}
                style={{ fontSize: 12 }}
              >
                Info@beautyinthestreets.com
              </p>
            </Col>
            <Col span={8}>
              <div className="d-flex align-items-center justify-content-center">
                <div className="contactIconsView d-flex align-items-center justify-content-center">
                  <img src={phone_fill_icon} style={{ width: 20 }} />
                </div>
              </div>
              <p
                className={`${textColor2} text-center m-0`}
                style={{ fontSize: 12 }}
              >
                Info@beautyinthestreets.com
              </p>
            </Col>
            <Col span={8}>
              <div className="d-flex align-items-center justify-content-center">
                <div className="contactIconsView d-flex align-items-center justify-content-center">
                  <img src={location_fill_icon} style={{ width: 20 }} />
                </div>
              </div>
              <p
                className={`${textColor2} text-center m-0`}
                style={{ fontSize: 12 }}
              >
                300 W Clarendon Ave. Suite 240 Phoenix, AZ, 85013
              </p>
            </Col>
          </Row>
        </Modal>
      </div>
    </div>
  );
};

export default Contact;
