import React from "react";
import { Input } from "antd";
import "./css/index.css";

const InputComponent = ({ placeholder, value, onChange }) => {
  return (
    <div>
      <Input
        placeholder={placeholder}
        className="inputStyle regular"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputComponent;
