import React from "react";
import { Input } from "antd";
import "./css/index.css";

const InputComponent = ({ placeholder, value, name, onChange, password, maxLength, onKeyPress }) => {
  return (
    <div>
      {password ? (
        <Input.Password
          placeholder={placeholder}
          className="inputStyle regular"
          visibilityToggle={false}
          onChange={onChange}
          name={name}
          value={value}
          autoComplete="new-password"
        />
      ) : (
        <Input
          placeholder={placeholder}
          maxLength={maxLength}
          className="inputStyle regular"
          name={name}
          onChange={onChange}
          onKeyPress={onKeyPress}
          value={value}
          autoComplete="new-password"
        />
      )}
    </div>
  );
};

export default InputComponent;
