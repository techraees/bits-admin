import React from "react";
import "./css/index.css";
import { Input } from "antd";

const LabelInput = ({ label, password }) => {
  return (
    <div
      className="p-1 d-flex"
      style={{ borderBottom: "1px solid #303030", alignItems: "end" }}
    >
      <span className="red inputLabel">{label}</span>
      {password ? (
        <Input.Password
          className="labelInputStyle me-5"
          visibilityToggle={false}
        />
      ) : (
        <Input className="labelInputStyle me-5" />
      )}
    </div>
  );
};

export default LabelInput;
