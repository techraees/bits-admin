import React from "react";
import "./css/index.css";
import { Button } from "antd";

const ButtonComponent = ({text, onClick}) => {
  return <Button onClick={onClick} className="btnDesign red-gradient">{text}</Button>;
};

export default ButtonComponent;
