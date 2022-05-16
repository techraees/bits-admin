import React from "react";
import {
  bar_chart,
  message2,
  refresh,
  trending_down,
  trending_up,
  trending_up2,
  user2,
  users,
} from "../../assets";
import { NavbarComponent, StatisticsCard } from "../../components";
import "./css/index.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import faker from "faker";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const labels = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];

export const data = {
  labels,
  datasets: [
    {
      label: "Visits",
      data: labels.map(() => faker.datatype.number({ min: 1000, max: 100000 })),
      borderColor: "#282347",
      backgroundColor: "#282347",
    },
    {
      label: "Watch time",
      data: labels.map(() => faker.datatype.number({ min: 1000, max: 100000 })),
      borderColor: "#fff",
      backgroundColor: "#fff",
    },
  ],
};
const Dashboard = () => {
  let topUsersData = [
    {
      name: "John",
      status: "Speedy walkover",
      views: "8.2k",
    },
    {
      name: "Katty",
      status: "Speedy walkover",
      views: "8.2k",
    },
    {
      name: "Hannah",
      status: "Speedy walkover",
      views: "8.2k",
    },
    {
      name: "John",
      status: "Speedy walkover",
      views: "8.2k",
    },
    {
      name: "Katty",
      status: "Speedy walkover",
      views: "8.2k",
    },
    {
      name: "Hannah",
      status: "Speedy walkover",
      views: "8.2k",
    },
    {
      name: "Katty",
      status: "Speedy walkover",
      views: "8.2k",
    },
    {
      name: "Hannah",
      status: "Speedy walkover",
      views: "8.2k",
    },
  ];
  let notifications = [
    {
      name: "Hannah",
      status: "Updated  profile",
    },
    {
      name: "Hannah",
      status: "Registered on BITS",
    },
    {
      name: "Hannah",
      status: "Updated  profile",
    },
    {
      name: "Hannah",
      status: "Registered on BITS",
    },
    {
      name: "Hannah",
      status: "Updated  profile",
    },
    {
      name: "Hannah",
      status: "Registered on BITS",
    },
  ];
  return (
    <div className="bg-dark-blue">
      <NavbarComponent />
      <div className="container py-3" style={{ marginTop: 60 }}>
        <h5 className="white">Dashboard</h5>
        <div className="row">
          <StatisticsCard
            icon={bar_chart}
            count={"347K"}
            status={"Total Visits"}
            trendingIcon={trending_up}
            trendingPer={"0.24"}
            duration={"Last month"}
            perColor={"green"}
            iconBgColor={"#232645"}
          />
          <StatisticsCard
            icon={user2}
            count={"45K"}
            status={"Total Users"}
            trendingIcon={trending_up}
            trendingPer={"0.24"}
            duration={"Last month"}
            perColor={"green"}
            iconBgColor={"#383137"}
          />
          <StatisticsCard
            icon={message2}
            count={"154 872"}
            status={"Total Registered users"}
            trendingIcon={trending_down}
            trendingPer={"20"}
            duration={"Last month"}
            perColor={"red2"}
            iconBgColor={"#282347"}
          />
          <StatisticsCard
            icon={users}
            count={"167"}
            status={"Active users"}
            trendingIcon={trending_up2}
            trendingPer={"20"}
            duration={"Last month"}
            perColor={"yellow"}
            iconBgColor={"#26353f"}
          />
        </div>
        <div className="row">
          <div className="col-lg-9">
            <Line options={options} data={data} />
            <div className="row">
              <div className="col-lg-4">
                <div
                  className="radius2 d-flex center my-3 pb-4 pt-5"
                  style={{
                    flexDirection: "column",
                    backgroundColor: "#8BA937",
                  }}
                >
                  <h5 className="white">Last week Visits</h5>
                  <h5 className="light-grey">200K</h5>
                  <div className="d-flex center">
                    <img src={trending_up} style={{ width: 25 }} />
                    <h5 className="green ms-2 mb-0">2.54%</h5>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div
                  className="radius2 d-flex center my-3 pb-4 pt-5"
                  style={{
                    flexDirection: "column",
                    backgroundColor: "#246390",
                  }}
                >
                  <h5 className="white">Last Month Visits</h5>
                  <h5 className="light-grey">900K</h5>
                  <div className="d-flex center">
                    <img src={trending_up} style={{ width: 25 }} />
                    <h5 className="green ms-2 mb-0">2.54%</h5>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div
                  className="radius2 d-flex center my-3 pb-4 pt-5"
                  style={{
                    flexDirection: "column",
                    backgroundColor: "#B52269",
                  }}
                >
                  <h5 className="white">Last Year Visits</h5>
                  <h5 className="light-grey">100M</h5>
                  <div className="d-flex center">
                    <img src={trending_up} style={{ width: 25 }} />
                    <h5 className="green ms-2 mb-0">2.54%</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-dark-blue3 radius1 py-3 px-4 my-1">
              <div className="d-flex center justify-content-between">
                <h5 className="white">Notifications</h5>
                <div>
                  <img src={refresh} className="cursor" />
                  <span className="white ms-3 cursor">See All</span>
                </div>
              </div>
              <div className="row">
                {notifications.map((e, i) => {
                  return (
                    <div key={i} className="col-lg-4 my-2">
                      <div className="grey-border-bottom py-2">
                        <p className="white m-0">{e.name}</p>
                        <span className="light-grey">{e.status}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div
              className="bg-dark-blue3 radius2 d-flex center py-4 my-3"
              style={{ flexDirection: "column" }}
            >
              <h5 className="white mb-1">New Registrations</h5>
              <h5 className="red m-0">+338</h5>
            </div>
            <div
              className="bg-dark-blue3 radius2 d-flex center py-4 my-4"
              style={{ flexDirection: "column" }}
            >
              <h5 className="white mb-1">Daily Avg Registrations</h5>
              <h5 className="red m-0">200+</h5>
            </div>
            <div className="bg-dark-blue3 radius2 p-3 my-3">
              <div className="d-flex justify-content-between my-2">
                <div>
                  <h5 className="white m-0">Top Users</h5>
                  <span className="light-grey">Daily 1400 Views</span>
                </div>
                <span className="light-grey">Views</span>
              </div>
              {topUsersData.map((e, i) => {
                return (
                  <div
                    key={i}
                    className="d-flex justify-content-between grey-border-bottom py-2"
                  >
                    <div>
                      <h5 className="white m-0">{e.name}</h5>
                      <span className="light-grey">{e.status}</span>
                    </div>
                    <span className="pink semi-bold">{e.views}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="grey-border-top">
          <div className="mt-3">
            <span className="light-grey">2022 © BITS - BITS.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
