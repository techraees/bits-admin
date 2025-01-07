import React from "react";
import "./css/index.css";
import { Button } from "antd";
import ClipLoader from "react-spinners/ClipLoader";

const ButtonComponent = ({
  text,
  onClick,
  simple,
  height,
  radius,
  green,
  width,
  disabled,
  isLoading,
}) => {
  // console.log("disa", disabled);
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
        <>
          <Button
            onClick={onClick}
            style={{
              height: height ? height : 50,
              borderRadius: radius ? radius : 20,
              width: width && width,
            }}
            className={`btnDesign ${isLoading ? "cursor-not-allowed " : "cursor-pointer"} ${isLoading ? "button-disable-color" : green ? "green-gradient" : "red-gradient"}`}
            disabled={disabled && true}
          >
            {isLoading ?
              <ClipLoader color="#fff" size={20} />
              : text
            }
          </Button>
        </>
      )}
    </>
  );
};

export default ButtonComponent;
