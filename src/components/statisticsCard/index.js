import React from "react";
import { bar_chart, trending_up } from "../../assets";
import "./css/index.css";

const StatisticsCard = ({
  icon,
  count,
  status,
  trendingIcon,
  trendingPer,
  duration,
  perColor,
  iconBgColor,
  width,
  onClick = (e) => {},
  ghraphToShow,
}) => {
  const handleClick = (e) => {
    if (typeof onClick === "function") {
      onClick(e);
    }
  };

  return (
    <div
      style={{
        width: width && "100%",
      }}
      className="col-lg-3 col-md-4 col-sm-6 col-12 my-2 cursor-pointer"
      onClick={handleClick}
    >
      <div
        className="statisticsCardStyle d-flex center"
        style={{
          backgroundColor: `${
            ghraphToShow.type == status ? ghraphToShow.bg : "#222236"
          }`,
        }}
      >
        <div
          className="statisticsIconView ms-3"
          style={{ backgroundColor: iconBgColor }}
        >
          <img
            src={icon}
            alt=""
            style={{
              filter: `${ghraphToShow.type == status ? "invert()" : "none"}`,
            }}
          />
        </div>
        <div className="mt-4 ms-2">
          <h5
            className=""
            style={{
              color: `${ghraphToShow.type == status ? "black" : "white"}`,
            }}
          >
            {count}
          </h5>
          <span
            className=""
            style={{
              color: `${ghraphToShow.type == status ? "black" : "gray"}`,
            }}
          >
            {status}
          </span>
          <div>
            <img src={trendingIcon} />
            <span className={`${perColor} ms-2`}>{trendingPer}</span>
            <span className="light-grey ms-2">{duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;
