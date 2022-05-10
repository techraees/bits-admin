import React from "react";
import "./css/index.css";
import { DatePicker, Space } from "antd";
import { down_arrow2 } from "../../assets";

const DatePickerComponent = () => {
  function onChange(date, dateString) {
    console.log(date, dateString);
  }
  return (
    // <div>
    //   <DatePicker onChange={onChange} />
    // </div>
    <div
      className="p-1 d-flex justify-content-between mt-4"
      style={{ borderBottom: "1px solid #303030", alignItems: "end" }}
    >
      <span className="red inputLabel">Date of Birth</span>
      {/* <DatePicker
        bordered={false}
        onChange={onChange}
        placeholder=""
        className="datePickerStyle"
        // nextIcon={<DownOutlined style={{ color: "#CCCCCC" }} />}
        // prevIcon={<DownOutlined style={{ color: "#CCCCCC" }} />}
        style={{ marginLeft:150 }}
        placement="topRight"
        suffixIcon={<DownOutlined style={{ color: "#CCCCCC" }} />}
        // value=""
      /> */}
      <img src={down_arrow2} style={{width:18}}/>
    </div>
  );
};

export default DatePickerComponent;
