import React from "react";
import "./css/index.css";
import { Button } from "antd";

const ButtonComponent = ({ text, onClick, simple, height }) => {
  return (
    <>
      {simple ? (
        <Button onClick={onClick} className="simpleBtnDesign red-background">
          {text}
        </Button>
      ) : (
        <Button
          onClick={onClick}
          style={{ height: height ? height : 50 }}
          className="btnDesign red-gradient"
        >
          {text}
        </Button>
      )}
    </>
  );
};

export default ButtonComponent;
