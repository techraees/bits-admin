import React from "react";
import { check, profile2 } from "../../assets";
import "./css/index.css";
import { useSelector } from "react-redux";

const Transactions = ({ data, checkIcon }) => {
  const textColor = useSelector((state) => state.app.theme.textColor);
  const textColor2 = useSelector((state) => state.app.theme.textColor2);
  const textColor3 = useSelector((state) => state.app.theme.textColor3);
  const bgColor2 = useSelector((state) => state.app.theme.bgColor2);
  return (
    <div className="py-2">
      <div
        className="d-flex justify-content-between m-4"
        style={{ alignItems: "center" }}
      >
        <h4 className={`${textColor} m-0`}>Transactions</h4>
        <div className="cursor" style={{ textDecoration: "underline" }}>
          <span className="red-gradient-color">View All</span>
        </div>
      </div>
      {data &&
        data.map((e, i) => {
          return (
            <div
              key={i}
              className={`d-flex justify-content-between shadowBorder py-3 cardsPadding my-4 ${bgColor2}`}
              style={{ alignItems: "center" }}
            >
              <div className="d-flex" style={{ alignItems: "center" }}>
                {e.image && (
                  <img className="me-4" src={e.image} style={{ width: 60 }} />
                )}
                <div>
                  <span className={textColor2}>{e.name}</span>
                  <div>
                    {checkIcon && <img src={check} className="me-2" />}
                    {e.buyerName && (
                      <span className={textColor2}>
                        Sold to {e.buyerName} on{" "}
                      </span>
                    )}
                    <span className="red">{e.date}</span>
                  </div>
                </div>
              </div>
              <h4 className={`m-0 ${textColor3}`}>{e.price}</h4>
            </div>
          );
        })}
    </div>
  );
};

export default Transactions;
