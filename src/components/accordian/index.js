import React, { useState } from "react";
import "./css/index.css";
import { Collapse } from "antd";
import { down_arrow3, up_arrow2 } from "../../assets";

const AccordianComponent = ({ data }) => {
  const [panelKey, setPanelKey] = useState("");
  const { Panel } = Collapse;
  function callback(key) {
    setPanelKey(key);
  }
  return (
    <div className="mt-4" style={{ backgroundColor: "#282828" }}>
      <Collapse
        onChange={callback}
        expandIconPosition={"right"}
        expandIcon={() => false}
        className="accordianStyle white"
        ghost={true}
        accordion={true}
      >
        {data &&
          data.map((e) => {
            return (
              <Panel
                className="panelStyle white p-2 ps-4"
                header={e.title}
                key={e.key}
                extra={
                  panelKey === e.key ? (
                    <img src={up_arrow2} style={{ width: 20 }} />
                  ) : (
                    <img src={down_arrow3} style={{ width: 20 }} />
                  )
                }
              >
                <ul>
                  <li className="py-3 white">{e.description}</li>
                </ul>
              </Panel>
            );
          })}
      </Collapse>
    </div>
  );
};

export default AccordianComponent;
