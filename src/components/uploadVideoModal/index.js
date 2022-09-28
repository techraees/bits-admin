import React, { useState } from "react";
import { check, upload, upload_file_icon, upload_red } from "../../assets";
import { ButtonComponent } from "../index";
import { Button, Modal, Row, Col, Progress, Input } from "antd";
import "./css/index.css";
import { useSelector } from "react-redux";

const UploadVideoModal = ({ visible, onClose }) => {
  const backgroundTheme = useSelector(
    (state) => state.app.theme.backgroundTheme
  );
  const textColor = useSelector((state) => state.app.theme.textColor);
  const textColor2 = useSelector((state) => state.app.theme.textColor2);
  const textColor3 = useSelector((state) => state.app.theme.textColor3);
  const bgColor2 = useSelector((state) => state.app.theme.bgColor2);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Modal
      // wrapClassName={backgroundTheme}
      footer={null}
      className={backgroundTheme}
      bodyStyle={{ backgroundColor: "#222222" }}
      open={visible}
      onOk={onClose}
      onCancel={onClose}
    >
      <div>
        <p className={`${textColor} fs-5 text-center m-0`}>
          Upload Emote/Video
        </p>
        <Row
          className="dragVideoView py-4 mt-4 mx-2"
          gutter={{ xs: 8, sm: 16, md: 20, lg: 32 }}
        >
          <Col lg={10} md={10} sm={24} xs={24}>
            <div className=" d-flex flex-column align-items-center">
              <div
                className={`uploadIconView d-flex align-items-center justify-content-center`}
              >
                <img src={textColor === "white" ? upload : upload_red} />
              </div>
              <p className={`${textColor2} m-0 mt-3 mb-2 text-center`}>
                Drag and drop here <br /> or
              </p>
              <ButtonComponent text={"Browse"} height={40} />
            </div>
          </Col>
          <Col lg={14} md={14} sm={24} xs={24}>
            <p className={`${textColor2} m-0 mt-3 mb-2 ms-3`}>
              Speedy-Walkover.Mp4
            </p>
            <div className="d-flex">
              <img src={upload_file_icon} className="me-2" />
              <Progress percent={70} status="exception" />
            </div>
            <p className={`${textColor2} m-0 mt-3 mb-2 ms-3`}>
              Speedy-Walkover.Mp4
            </p>
            <div className="d-flex">
              <img src={upload_file_icon} className="me-2" />
              <Progress percent={100} />
            </div>
          </Col>
        </Row>
        <div className="mt-4">
          <div className="my-4">
            <p style={{ color: "#C44040" }} className="mb-2">
              Dance Moment Name
            </p>
            <Input placeholder="Dance Moment Name" className="greyBgInput" />
          </div>
          <div className="my-4">
            <p style={{ color: "#C44040" }} className="mb-2">
              Artist
            </p>
            <Input placeholder="Artist" className="greyBgInput" />
          </div>
          <div className="my-4">
            <p style={{ color: "#C44040" }} className="mb-2">
              Description
            </p>
            <Input.TextArea
              rows={4}
              className="greyBgInput"
              placeholder="Description"
            />
          </div>
          <div className="d-flex justify-content-center">
            <ButtonComponent text={"Create NFT"} height={40} width={170} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UploadVideoModal;
