import React from "react";
import "./css/index.css";
import { Button } from "antd";

const ButtonComponent = ({
  text,
  onClick,
  simple,
  height,
  radius,
  green,
  width,
}) => {
  return (
    <>
      {simple ? (
        <Button
          style={{ width: width ? width : "100%" }}
          onClick={onClick}
          className="simpleBtnDesign red-background"
        >
          {text}
        </Button>
      ) : (
        <Button
          onClick={onClick}
          style={{
            height: height ? height : 50,
            borderRadius: radius ? radius : 20,
            width: width && width,
          }}
          className={`btnDesign ${green ? "green-gradient" : "red-gradient"}`}
        >
          {text}
        </Button>
      )}
    </>
  );
};

export default ButtonComponent;
