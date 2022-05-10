import React from "react";
import { Input } from "antd";
import "./css/index.css";

const InputComponent = ({ placeholder, value, onChange, password }) => {
  return (
    <div>
      {password ? (
        <Input.Password
          placeholder={placeholder}
          className="inputStyle regular"
          visibilityToggle={false}
        />
      ) : (
        <Input
          placeholder={placeholder}
          className="inputStyle regular"
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default InputComponent;
