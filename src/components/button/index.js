import React from "react";
import "./css/index.css";
import { Button } from "antd";

const ButtonComponent = ({ text, onClick, simple }) => {
  return (
    <>
      {simple ? (
        <Button onClick={onClick} className="simpleBtnDesign red-background">
          {text}
        </Button>
      ) : (
        <Button onClick={onClick} className="btnDesign red-gradient">
          {text}
        </Button>
      )}
    </>
  );
};

export default ButtonComponent;
