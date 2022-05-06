import React from "react";
import "./css/index.css";
import { Button } from "antd";

const ButtonComponent = ({text}) => {
  return <Button className="btnDesign red-gradient">{text}</Button>;
};

export default ButtonComponent;
