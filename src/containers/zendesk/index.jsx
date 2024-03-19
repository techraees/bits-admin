import React from "react";
import Zendesk, { ZendeskAPI } from "../../zendeskConfig";
import { useEffect } from "react";

const environment = process.env;

const ZendeskComp = ({ showChat }) => {
  const handleLoaded = (status) => {
    ZendeskAPI("messenger", status);
  };

  useEffect(() => {
    if (showChat) {
      handleLoaded("open");
    } else {
      handleLoaded("close");
    }
  }, [showChat]);

  return (
    <div>
      <Zendesk
        defer
        zendeskKey={environment.REACT_APP_ZENDESK_KEY}
        onLoaded={handleLoaded}
      />
    </div>
  );
};

export default ZendeskComp;
