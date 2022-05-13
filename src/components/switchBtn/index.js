import React from "react";
import "./css/index.css";
import { Switch } from "antd";
import { useSelector, useDispatch } from "react-redux";

const SwitchBtn = () => {
  const data = useSelector((state) => state.app.theme.backgroundTheme);
  const dispatch = useDispatch();
  console.log(data);
  function onChange(checked) {
    dispatch({
      type: "THEME",
      theme: {
        backgroundTheme: `${checked ? "black-background" : "light-background"}`,
        headerTheme: `${checked ? "black-background2" : "red-background2"}`,
        textColor: `${checked ? "white" : "black"}`,
        textColor2: `${checked ? "light-grey" : "dark-grey"}`,
        textColor3: `${checked ? "white" : "red"}`,
        bgColor: `${checked ? "dark-grey-bg" : "white2"}`,
        bgColor2: `${checked ? "" : "light-background2"}`,
        bgColor3: `${checked ? "black-background3" : "light-background3"}`,
        border: `${checked ? "dark-border" : "light-border"}`
      },
    });
    console.log(`switch to ${checked}`);
  }
  return (
    <Switch defaultChecked className="switchBtnStyle" onChange={onChange} />
  );
};

export default SwitchBtn;
