import { useQuery } from "@apollo/client";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  bar_chart,
  message2,
  user2,
  users
} from "../../assets";
import { NavbarComponent, StatisticsCard } from "../../components";
import { GET_ALL_CONTACTS, GET_ALL_NOTIFICATIONS, GET_ALL_VISITS, GET_USERS_COUNT } from "../../gql/queries";
import { grabEvents } from "../../utills/grabEvents";
import "./css/index.css";
import LineChart from "./LineChart";

import TotalVisits from './components/TotalVisits'
import ActiveUsers from './components/ActiveUsers'
import DailyAvgRegistrations from './components/DailyAvgRegistrations'
import MaxAllTime from './components/MaxAllTime'
import NewRegistrations from './components/NewRegistrations'
import NftSold from './components/NftSold'
import TotalRegisteredUsers from './components/TotalRegisteredUsers'
import UniqueVisits from './components/UniqueVisits'


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [chartData, setChartData] = useState(0)
  const navigate = useNavigate();
  const [ghraphToShow, setGhraphToShow] = useState({
    type: "Total Visits",
    bg: "#2F49D1",
  });
  const {
    loading: contactsLoading,
    error: contactsError,
    data: contactData,
    refetch: dataRefetch,
  } = useQuery(GET_ALL_CONTACTS);

  const {
    loading: visitsLoading,
    error: visitsError,
    data: visitData,
    refetch: visitdataRefetch,
  } = useQuery(GET_ALL_VISITS);
  const {
    loading,
    error,
    data: totalRegistered,
    refetch,
  } = useQuery(GET_USERS_COUNT);
  const { data: allNotifications } = useQuery(GET_ALL_NOTIFICATIONS);

  const { topUsersData } = useSelector((state) => state.topUsers.topUsersData);
  const contracts = useSelector((state) => state.contracts);
  const { transactionData } = useSelector(
    (state) => state.totalTrans.transactionData
  );
  const [contractEvents, setContractEvents] = useState([]);

  useEffect(() => {
    async function init() {
      grabEvents(setContractEvents);
    }

    init();
  }, []);

  useEffect(() => {
    dataRefetch();
  }, []);

  useEffect(() => {
    visitdataRefetch();
  }, []);


  return (
    <>
      <div className="bg-dark-blue">
        <NavbarComponent selectedKey={"1"} />
        <div className="container py-4 dashboardContainer">
          <h5 className="white">Dashboard</h5>
          <div className="row card-data">
            <TotalVisits
              ghraphToShow={ghraphToShow}
              setGhraphToShow={setGhraphToShow}
            />
            <UniqueVisits
              ghraphToShow={ghraphToShow}
              setGhraphToShow={setGhraphToShow} />

            <TotalRegisteredUsers
              ghraphToShow={ghraphToShow}
              setGhraphToShow={setGhraphToShow} />


            <ActiveUsers
              ghraphToShow={ghraphToShow}
              setGhraphToShow={setGhraphToShow} />

            <NftSold
              ghraphToShow={ghraphToShow}
              setGhraphToShow={setGhraphToShow} />

            <NewRegistrations
              ghraphToShow={ghraphToShow}
              setGhraphToShow={setGhraphToShow} />


            <DailyAvgRegistrations
              ghraphToShow={ghraphToShow}
              setGhraphToShow={setGhraphToShow} />


            <MaxAllTime
              ghraphToShow={ghraphToShow}
              setGhraphToShow={setGhraphToShow} />


           

          </div>

          <div className="row data">
            <div className="col-lg-9">
              <div className="graph">
                {chartData?.data && <LineChart data={chartData.data} labels={chartData.labels} />}
              </div>
              <div className="row visits-data">
                <div
                  className="col-lg-4 cursor-pointer"
                  onClick={(e) => {

                  }}
                >
                  <div
                    className="radius2 d-flex center my-3 pb-4 pt-5"
                    style={{
                      flexDirection: "column",
                      backgroundColor: `${"null" == "Week" ? "#2a2a57" : "#8BA937"
                        }`,
                    }}
                  >
                    <h5 className="white">Last week</h5>
                    <h5 className="light-grey">
                    </h5>
                    <div className="d-flex center">
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-4 cursor-pointer"
                  onClick={(e) => {

                  }}


                >
                  <div
                    className="radius2 d-flex center my-3 pb-4 pt-5"
                    style={{
                      flexDirection: "column",
                      backgroundColor: `${"null" == "Month" ? "#2a2a57" : "#246390"
                        }`,
                    }}
                  >
                    <h5 className="white">Last Month</h5>
                    <h5 className="light-grey">
                    </h5>
                    <div className="d-flex center">
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-4 cursor-pointer"
                  onClick={(e) => {

                  }}
                >
                  <div
                    className="radius2 d-flex center my-3 pb-4 pt-5"
                    style={{
                      flexDirection: "column",
                      backgroundColor: `${"null" == "Year" ? "#2a2a57" : "#B52269"
                        }`,
                    }}
                  >
                    <h5 className="white">Last Year</h5>
                    <h5 className="light-grey">
                    </h5>
                    <div className="d-flex center">
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-dark-blue3 radius1 py-3 px-4 my-1 notification-div">
                <div className="d-flex center justify-content-between">
                  <h5 className="white">Notifications</h5>
                  <div onClick={() => navigate("/user-information")}>
                    <span className="white ms-3 cursor">See All</span>
                  </div>
                </div>
                <div className="row">
                  {allNotifications?.allNotifications?.map((e, i) => {
                    return (
                      <div key={i} className="col-lg-4 my-2">
                        <div className="grey-border-bottom py-2">
                          <p className="white m-0">{e.user_name}</p>
                          <span className="light-grey">Registered on BITS</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="bg-dark-blue3 radius1 py-3 px-4 my-4 notification-div">
                <div className="d-flex center justify-content-between">
                  <h5 className="white">Contract Notifications</h5>
                  <div onClick={() => navigate("/payment")}>
                    <span className="white ms-3 cursor">See All</span>
                  </div>
                </div>
                <div className="row">
                  {contractEvents?.map((e, i) => {
                    return (
                      <div key={i} className="col-lg-4 my-2">
                        <div className="grey-border-bottom py-2">
                          <p className="white m-0">{e.address}</p>
                          <span className="light-grey">{e.message} on BITS</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div
                className="radius2 d-flex center py-4 my-3 cursor-pointer"
                style={{
                  flexDirection: "column",
                  height: "8.5rem",
                  justifyContent: "center",
                  backgroundColor: `${ghraphToShow.type == "NFTs Sold"
                    ? "rgb(61, 18, 26)"
                    : "#222235"
                    }`,
                }}
                onClick={(e) => {
                  setGhraphToShow({ type: "NFTs Sold", bg: '#8B37A9' })
                }
                }
              >
                <h5 className="white mb-1">NFTs Sold</h5>
                <h5 className="red m-0">{0}</h5>
              </div>
              <div
                className="radius2 d-flex center py-4 my-4  cursor-pointer"
                style={{
                  flexDirection: "column",
                  height: "8.5rem",
                  justifyContent: "center",
                  backgroundColor: `${ghraphToShow.type == "New Registrations"
                    ? "rgb(61, 18, 26)"
                    : "#222235"
                    }`,
                }}
                onClick={(e) => {
                  setGhraphToShow({ type: "New Registrations", bg: '#8B37A9' })
                }
                }


              >
                <h5 className="white mb-1">New Registrations</h5>
                <h5 className="red m-0">{0}</h5>
              </div>
              <div
                className="radius2 d-flex center py-4 my-4  cursor-pointer"
                style={{
                  flexDirection: "column",
                  height: "8.5rem",
                  justifyContent: "center",
                  backgroundColor: `${ghraphToShow.type == "Daily Avg Registrations"
                    ? "rgb(61, 18, 26)"
                    : "#222235"
                    }`,
                }}
                onClick={(e) => {
                  setGhraphToShow({ type: "Daily Avg Registrations", bg: '#8B37A9' })
                }
                }

              >
                <h5 className="white mb-1">Daily Avg Registrations</h5>
                <h5 className="red m-0">
                  {0}
                </h5>
              </div>

              <div
                className="radius2 d-flex center my-3 pb-4 pt-5 cursor-pointer"
                onClick={(e) => {

                }}
                style={{
                  flexDirection: "column",
                  backgroundColor: `${"null" == "Max" ? "rgb(61, 18, 26)" : "#8B37A9"
                    }`,
                }}
              >
                <h5 className="white">Max</h5>
                <div className="d-flex center">
                </div>
              </div>

              <div className="bg-dark-blue3 radius2 p-3 my-3">
                <div
                  id="carouselExampleCaptions"
                  className="carousel slide user-view-slider"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <div className="d-flex justify-content-between mt-5 mb-2">
                        <div>
                          <h5 className="white m-0">Top Users</h5>
                          <span className="light-grey">By Bought</span>
                        </div>
                        <span className="light-grey">Amount</span>
                      </div>
                      {topUsersData?.topByBought?.map((item) => {
                        return contactData?.GetAllUsers?.map((e, i) => {
                          if (item.buyer == e.user_address) {
                            return (
                              <div
                                key={i}
                                className="d-flex justify-content-between grey-border-bottom py-2"
                              >
                                <Link
                                  to={`user-information/user-profile/${e.id}`}
                                >
                                  <h5 className="white m-0">{e.user_name}</h5>
                                  <span className="light-grey">{e.status}</span>
                                </Link>
                                <span className="pink semi-bold">
                                  ${item.price.toFixed(4)}
                                </span>
                              </div>
                            );
                          }
                        });
                      })}
                    </div>
                    <div className="carousel-item">
                      <div className="d-flex justify-content-between mt-5 mb-2">
                        <div>
                          <h5 className="white m-0">Top Users</h5>
                          <span className="light-grey">By Sold</span>
                        </div>
                        <span className="light-grey">Amount</span>
                      </div>
                      {topUsersData?.topBySold?.map((item) => {
                        return contactData?.GetAllUsers?.map((e, i) => {
                          if (item.seller == e.user_address) {
                            return (
                              <div
                                key={i}
                                className="d-flex justify-content-between grey-border-bottom py-2"
                              >
                                <div>
                                  <h5 className="white m-0">{e.user_name}</h5>
                                  <span className="light-grey">{e.status}</span>
                                </div>
                                <span className="pink semi-bold">
                                  ${item.price.toFixed(4)}
                                </span>
                              </div>
                            );
                          }
                        });
                      })}
                    </div>
                  </div>

                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grey-border-top last-div">
            <div className="mt-3">
              <span className="light-grey">2023 © BITS - BITS.com</span>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default Dashboard;
