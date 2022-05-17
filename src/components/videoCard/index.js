import React from "react";
import { thumbnail, profile_small } from "../../assets";
import "./css/index.css";
import { Button } from "antd";

const VideoCard = ({ videoThumbnail, name, title, image, description }) => {
  return (
    <div className="light-grey-border-bottom d-flex center py-4">
      <img src={videoThumbnail} className="me-3" style={{ width: 150 }} />
      <div>
        <h5 className="m-0">{title}</h5>
        <div className="d-flex center">
          <img src={image} />
          <h5 className="m-0 ms-2 red2">{name}</h5>
        </div>
        <span className="light-grey">{description}</span>
      </div>
      <div className="d-block ms-3">
        <Button className="videoCardBtns bg-black radius1 mb-2 white">
          Block
        </Button>
        <Button className="videoCardBtns bg-red2 radius1 white">Remove</Button>
      </div>
    </div>
  );
};

export default VideoCard;
