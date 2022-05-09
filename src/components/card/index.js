import React from "react";
import "./css/index.css";
import { Card } from "antd";
import ReactPlayer from "react-player";
import { check, cross, profile, thumb } from "../../assets";
import ButtonComponent from "../button";

const CardCompnent = ({ image, status, name, videoLink }) => {
  return (
    <div className="my-4 col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center">
      <Card
        hoverable
        className="cardContainer"
        cover={
          <ReactPlayer
            width={240}
            height={190}
            url={videoLink}
          />
        }
      >
        <div className="d-flex">
          <img src={image} alt="" />
          <span className="ms-2 light-grey2" style={{ fontSize: 10 }}>
            {status}
          </span>
        </div>
        <h5 className="light-grey2 mt-2">{name}</h5>
        <div>
          <img src={cross} style={{ width: 15 }} />
          <span className="light-grey2 ms-2" style={{ fontSize: 12 }}>
            No copyright Transfer
          </span>
        </div>
        <div className="my-1">
          <img src={check} style={{ width: 15 }} />
          <span className="light-grey2 ms-2" style={{ fontSize: 12 }}>
            First Gen Emote
          </span>
        </div>
        <div className="mt-4 mb-1 d-flex">
          <ButtonComponent height={40} text={"Buy NFT"} />
          <div className="red-gradient ms-3 d-flex justify-content-center thumbView">
            <img style={{ width: 25 }} className="mb-1" src={thumb} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CardCompnent;
