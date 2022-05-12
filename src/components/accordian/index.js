import React, { useState } from "react";
import "./css/index.css";
import { Collapse } from "antd";
import { down_arrow3, up_arrow2 } from "../../assets";
import ButtonComponent from "../button";

const AccordianComponent = ({ data, list, btnKey }) => {
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
        className="accordianStyle"
        ghost={true}
        expandIcon={({ isActive }) =>
          isActive ? (
            <img src={up_arrow2} style={{ width: 20 }} />
          ) : (
            <img src={down_arrow3} style={{ width: 20 }} />
          )
        }
      >
        {data &&
          data.map((e) => {
            return (
              <Panel className="panelStyle p-2" header={e.title} key={e.key}>
                {list ? (
                  <ul>
                    <li className="py-3 white">{e.description}</li>
                  </ul>
                ) : (
                  <>
                    <span className="white">{e.description}</span>
                    {e.key === btnKey && (
                      <div className="d-flex mt-4 justify-content-center">
                        <div style={{ minWidth: "40%" }}>
                          <ButtonComponent
                            height={40}
                            text={"Change Password"}
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </Panel>
            );
          })}
      </Collapse>
    </div>
  );
};

export default AccordianComponent;
