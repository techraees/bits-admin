import React from "react";
import "./css/index.css";
import { NavbarComponent, AccordianComponent } from "../../components/index";
import { useSelector } from "react-redux";

const PrivacySecurity = () => {
  let faqsData = [
    {
      key: "1",
      title: "Terms & Agreements",
      description: "Terms & Agreements",
    },
    {
      key: "2",
      title: "Security",
      description:
        "To ensure App Security, please keep your account safe please keep your password in a secure place.",
    },
    {
      key: "3",
      title: "Other Safety Practices",
      description:
        "Always practice safe-keep of your private wallet seed phrase and other wallet passwords private and not public to ensure the must security.",
    },
  ];
  const backgroundTheme = useSelector(
    (state) => state.app.theme.backgroundTheme
  );
  return (
    <div className={`${backgroundTheme} pb-4`} style={{ height: "100vh" }}>
      <NavbarComponent selectedKey={"13"} headerText={"Privacy & Security"} />
      <div className="container">
        <div className="my-5">
          <AccordianComponent btnKey={"2"} data={faqsData} />
        </div>
      </div>
    </div>
  );
};

export default PrivacySecurity;
