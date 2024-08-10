import { NavbarComponent, StatisticsCard } from "../../components";
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
import "./css/index.css";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
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
import LineChart from "./LineChart";
import { Link, useNavigate } from "react-router-dom";
import {
  likes,
  nfts,
  topNfts,
  visits,
  users as registerdUsers,
  visits_data,
  unique_visits_data,
  total_registered_data,
  active_users,
  nfts_sold_data,
  new_registration,
  daily_avg_registration_data
} from "./sampleData";
import {
  calculateTimeFrames,
  handleMaxView,
  handleViewChange
} from './helper'
import { GET_ALL_CONTACTS, GET_ALL_NOTIFICATIONS, GET_ALL_VISITS, GET_NEW_REGISTRATION, GET_USERS_COUNT } from "../../gql/queries";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { grabEvents } from "../../utills/grabEvents";

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

  const [likesData, setLikesData] = useState(likes);
  const [nftsData, setNftsData] = useState(nfts);
  const [topNftsData, setTopNftsData] = useState(topNfts);
  const [visitsData, setVisitsData] = useState([]);
  const [registeredUsersData, setRegisteredUsersData] = useState([]);
  const [nftsSoldData, setNftsSoldData] = useState([]);
  const [newRegisterations, setNewRegisterations] = useState(0);




  const [chartData, setChartData] = useState(0)
  const [currentSelectedValue, setCurrentSelectedValue] = useState('total_visits')
  const [countVisitsValue, setCountVisitsValue] = useState(visits_data.length)
  const [countUniqueVisitsValue, setCountUniqueVisitsValue] = useState(unique_visits_data.length)
  const [countTotalRegisteredUsersValue, setCountTotalRegisteredUsersValue] = useState(total_registered_data.length)
  const [countActiveUsersValue, setCountActiveUsersValue] = useState(active_users.length)
  const [countNFTSSoldValue, setCountNFTSSoldValue] = useState(nfts_sold_data.length)
  const [countNewRegistration, setCountNewRegistration] = useState(new_registration.length)
  const [countDailyAvgRegistration, setCountDailyAvgRegistration] = useState(daily_avg_registration_data.length)
  const [graphDataType, setGraphDataType] = useState(0)
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
  const { data: newRegistration } = useQuery(GET_NEW_REGISTRATION);

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


  useEffect(() => {
    if (visitData?.GetAllVisits) {
      let temp = visitData?.GetAllVisits;
      setVisitsData(temp);
      // setvisitDataGraphValue(temp.length);
    }
  }, [visitData?.GetAllVisits]);

  useEffect(() => {
    if (transactionData?.soldnft) {
      let temp = transactionData?.soldnft;
      setNftsSoldData(temp);
      // setnftSoldGraphValue(temp.length);
    }
  }, [transactionData?.soldnft]);

  const handleTotalVisit = (data, type, setChartData, setCountVisitsValue) => {
    handleViewChange(data, type, setChartData, setCountVisitsValue)
  }


  useEffect(() => {
    handleTotalVisit(visits_data, 'lastWeek', setChartData, setCountVisitsValue)
    setCurrentSelectedValue('total_visits')
  }, [])
  return (
    <>
      <div className="bg-dark-blue">
        <NavbarComponent selectedKey={"1"} />
        <div className="container py-4 dashboardContainer">
          <h5 className="white">Dashboard</h5>
          <div className="row card-data">
            <StatisticsCard
              icon={bar_chart}
              count={countVisitsValue}
              status={"Total Visits"}
              onClick={(e) => {
                setCurrentSelectedValue('total_visits')
                handleViewChange(visits_data, 'lastWeek', setChartData, setCountVisitsValue)
                setGhraphToShow({ bg: '#2F49D1', type: "Total Visits" })
              }
              }
              ghraphToShow={ghraphToShow}
            />
            <StatisticsCard
              icon={user2}
              // count={totalRegistered?.GetAllUsersCount?.uniqueVisitors}
              count={countUniqueVisitsValue}
              status={"Unique Visitors"}
              onClick={(e) => {
                setCurrentSelectedValue('unique_visits')
                handleViewChange(unique_visits_data, 'lastWeek', setChartData, setCountUniqueVisitsValue)
                setGhraphToShow(
                  { bg: '#FFB748', type: "Unique Visitors" }
                )
              }
              }
              ghraphToShow={ghraphToShow}
            // trendingIcon={trending_up}
            // trendingPer={"0.24"}
            // duration={"Last month"}
            // perColor={"green"}
            // iconBgColor={"#383137"}
            />
            <StatisticsCard
              icon={message2}
              // count={totalRegistered?.GetAllUsersCount?.registered}
              count={countTotalRegisteredUsersValue}
              status={"Total Registered users"}
              // trendingIcon={trending_down}
              // trendingPer={"20"}
              // duration={"Last month"}
              // perColor={"red2"}
              // iconBgColor={"#282347"}
              onClick={(e) => {
                setCurrentSelectedValue('total_registered_users')
                handleViewChange(total_registered_data, 'lastWeek', setChartData, setCountTotalRegisteredUsersValue)
                setGhraphToShow(
                  { bg: '#EA2EC1', type: "Total Registered users" }
                )
              }
              }
              ghraphToShow={ghraphToShow}
            />
            <StatisticsCard
              icon={users}
              // count={totalRegistered?.GetAllUsersCount?.active}
              count={countActiveUsersValue}
              status={"Active users"}
              // trendingIcon={trending_up2}
              // trendingPer={"20"}
              // duration={"Last month"}
              // perColor={"yellow"}
              // iconBgColor={"#26353f"}
              onClick={(e) => {
                setCurrentSelectedValue('active_users')
                handleViewChange(active_users, 'lastWeek', setChartData, setCountActiveUsersValue)
                setGhraphToShow(
                  { bg: '#3386C1', type: "Active users" }
                )
              }
              }
              ghraphToShow={ghraphToShow}
            />

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
                    if (currentSelectedValue == 'total_visits') {
                      setGraphDataType("Week");
                      setCurrentSelectedValue('total_visits')
                      handleTotalVisit(visits_data, 'lastWeek', setChartData, setCountVisitsValue)
                    } else if (currentSelectedValue == 'unique_visits') {
                      setGraphDataType("Week");
                      setCurrentSelectedValue('unique_visits')

                      handleTotalVisit(unique_visits_data, 'lastWeek', setChartData, setCountUniqueVisitsValue)
                    } else if (currentSelectedValue == 'total_registered_users') {
                      setCurrentSelectedValue('total_registered_users')

                      setGraphDataType("Week");
                      handleTotalVisit(total_registered_data, 'lastWeek', setChartData, setCountTotalRegisteredUsersValue)
                    } else if (currentSelectedValue == 'active_users') {
                      setCurrentSelectedValue('active_users')

                      setGraphDataType("Week");
                      handleTotalVisit(active_users, 'lastWeek', setChartData, setCountActiveUsersValue)
                    }
                    else if (currentSelectedValue == 'nfts_sold') {
                      setGraphDataType("Week");
                      setCurrentSelectedValue('nfts_sold')

                      handleTotalVisit(nfts_sold_data, 'lastWeek', setChartData, setCountNFTSSoldValue)
                    }
                    else if (currentSelectedValue == 'new_registration') {
                      setGraphDataType("Week");
                      setCurrentSelectedValue('new_registration')

                      handleTotalVisit(new_registration, 'lastWeek', setChartData, setCountNewRegistration)
                    }
                    else if (currentSelectedValue == 'daily_avg_registration') {
                      setGraphDataType("Week");
                      setCurrentSelectedValue('daily_avg_registration')

                      handleTotalVisit(daily_avg_registration_data, 'lastWeek', setChartData, setCountDailyAvgRegistration)
                    }
                  }}
                >
                  <div
                    className="radius2 d-flex center my-3 pb-4 pt-5"
                    style={{
                      flexDirection: "column",
                      backgroundColor: `${graphDataType == "Week" ? "#2a2a57" : "#8BA937"
                        }`,
                    }}
                  >
                    <h5 className="white">Last week</h5>
                    <h5 className="light-grey">
                      {/* {totalRegistered?.GetAllUsersCount?.lastWeekVisits} */}
                    </h5>
                    <div className="d-flex center">
                      {/* <img src={trending_up} style={{ width: 25 }} /> */}
                      {/* <h5 className="green ms-2 mb-0">2.54%</h5> */}
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-4 cursor-pointer"
                  onClick={(e) => {
                    if (currentSelectedValue == 'total_visits') {
                      setGraphDataType("Month");
                      setCurrentSelectedValue('total_visits')
                      handleTotalVisit(visits_data, 'lastMonth', setChartData, setCountVisitsValue)
                    } else if (currentSelectedValue == 'unique_visits') {
                      setGraphDataType("Month");
                      setCurrentSelectedValue('unique_visits')

                      handleTotalVisit(unique_visits_data, 'lastMonth', setChartData, setCountUniqueVisitsValue)
                    } else if (currentSelectedValue == 'total_registered_users') {
                      setCurrentSelectedValue('total_registered_users')

                      setGraphDataType("Month");
                      handleTotalVisit(total_registered_data, 'lastMonth', setChartData, setCountTotalRegisteredUsersValue)
                    } else if (currentSelectedValue == 'active_users') {
                      setCurrentSelectedValue('active_users')

                      setGraphDataType("Month");
                      handleTotalVisit(active_users, 'lastMonth', setChartData, setCountActiveUsersValue)
                    }
                    else if (currentSelectedValue == 'nfts_sold') {
                      setGraphDataType("Month");
                      setCurrentSelectedValue('nfts_sold')

                      handleTotalVisit(nfts_sold_data, 'lastMonth', setChartData, setCountNFTSSoldValue)
                    }
                    else if (currentSelectedValue == 'new_registration') {
                      setGraphDataType("Month");
                      setCurrentSelectedValue('new_registration')

                      handleTotalVisit(new_registration, 'lastMonth', setChartData, setCountNewRegistration)
                    }
                    else if (currentSelectedValue == 'daily_avg_registration') {
                      setGraphDataType("Month");
                      setCurrentSelectedValue('daily_avg_registration')

                      handleTotalVisit(daily_avg_registration_data, 'lastMonth', setChartData, setCountDailyAvgRegistration)
                    }
                  }}


                >
                  <div
                    className="radius2 d-flex center my-3 pb-4 pt-5"
                    style={{
                      flexDirection: "column",
                      backgroundColor: `${graphDataType == "Month" ? "#2a2a57" : "#246390"
                        }`,
                    }}
                  >
                    <h5 className="white">Last Month</h5>
                    <h5 className="light-grey">
                      {/* {totalRegistered?.GetAllUsersCount?.lastMonthVisits} */}
                    </h5>
                    <div className="d-flex center">
                      {/* <img src={trending_up} style={{ width: 25 }} /> */}
                      {/* <h5 className="green ms-2 mb-0">2.54%</h5> */}
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-4 cursor-pointer"
                  onClick={(e) => {
                    if (currentSelectedValue == 'total_visits') {
                      setGraphDataType("Year");
                      setCurrentSelectedValue('total_visits')
                      handleTotalVisit(visits_data, 'lastYear', setChartData, setCountVisitsValue)
                    } else if (currentSelectedValue == 'unique_visits') {
                      setGraphDataType("Year");
                      setCurrentSelectedValue('unique_visits')

                      handleTotalVisit(unique_visits_data, 'lastYear', setChartData, setCountUniqueVisitsValue)
                    } else if (currentSelectedValue == 'total_registered_users') {
                      setCurrentSelectedValue('total_registered_users')

                      setGraphDataType("Year");
                      handleTotalVisit(total_registered_data, 'lastYear', setChartData, setCountTotalRegisteredUsersValue)
                    } else if (currentSelectedValue == 'active_users') {
                      setCurrentSelectedValue('active_users')

                      setGraphDataType("Year");
                      handleTotalVisit(active_users, 'lastYear', setChartData, setCountActiveUsersValue)
                    }
                    else if (currentSelectedValue == 'nfts_sold') {
                      setGraphDataType("Year");
                      setCurrentSelectedValue('nfts_sold')

                      handleTotalVisit(nfts_sold_data, 'lastYear', setChartData, setCountNFTSSoldValue)
                    }
                    else if (currentSelectedValue == 'new_registration') {
                      setGraphDataType("Year");
                      setCurrentSelectedValue('new_registration')

                      handleTotalVisit(new_registration, 'lastYear', setChartData, setCountNewRegistration)
                    }
                    else if (currentSelectedValue == 'daily_avg_registration') {
                      setGraphDataType("Year");
                      setCurrentSelectedValue('daily_avg_registration')

                      handleTotalVisit(daily_avg_registration_data, 'lastYear', setChartData, setCountDailyAvgRegistration)
                    }
                  }}
                >
                  <div
                    className="radius2 d-flex center my-3 pb-4 pt-5"
                    style={{
                      flexDirection: "column",
                      backgroundColor: `${graphDataType == "Year" ? "#2a2a57" : "#B52269"
                        }`,
                    }}
                  >
                    <h5 className="white">Last Year</h5>
                    <h5 className="light-grey">
                      {/* {totalRegistered?.GetAllUsersCount?.lastYearVisits} */}
                    </h5>
                    <div className="d-flex center">
                      {/* <img src={trending_up} style={{ width: 25 }} /> */}
                      {/* <h5 className="green ms-2 mb-0">2.54%</h5> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-dark-blue3 radius1 py-3 px-4 my-1 notification-div">
                <div className="d-flex center justify-content-between">
                  <h5 className="white">Notifications</h5>
                  <div onClick={() => navigate("/user-information")}>
                    {/* <img src={refresh} className="cursor" /> */}
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
                    {/* <img src={refresh} className="cursor" /> */}
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
                  setCurrentSelectedValue('nfts_sold')
                  handleViewChange(nfts_sold_data, 'lastWeek', setChartData, setCountNFTSSoldValue)
                  setGhraphToShow({ type: "NFTs Sold", bg: '#8B37A9' })
                }
                }
              >
                <h5 className="white mb-1">NFTs Sold</h5>
                <h5 className="red m-0">{countNFTSSoldValue}</h5>
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
                  setCurrentSelectedValue('new_registration')
                  handleViewChange(new_registration, 'lastWeek', setChartData, setCountNewRegistration)
                  setGhraphToShow({ type: "New Registrations", bg: '#8B37A9' })
                }
                }


              >
                <h5 className="white mb-1">New Registrations</h5>
                <h5 className="red m-0">{countNewRegistration}</h5>
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
                  setCurrentSelectedValue('daily_avg_registration')
                  handleViewChange(daily_avg_registration_data, 'lastWeek', setChartData, setCountDailyAvgRegistration)
                  setGhraphToShow({ type: "Daily Avg Registrations", bg: '#8B37A9' })
                }
                }

              >
                <h5 className="white mb-1">Daily Avg Registrations</h5>
                <h5 className="red m-0">
                  {countDailyAvgRegistration}
                </h5>
              </div>

              <div
                className="radius2 d-flex center my-3 pb-4 pt-5 cursor-pointer"
                onClick={(e) => {
                  if (currentSelectedValue == 'total_visits') {
                    setGraphDataType("Max");
                    handleMaxView(visits_data, setChartData, setCountVisitsValue)
                  } else if (currentSelectedValue == 'unique_visits') {
                    setGraphDataType("Max");
                    handleMaxView(unique_visits_data, setChartData, setCountUniqueVisitsValue)
                  } else if (currentSelectedValue == 'total_registered_users') {
                    setGraphDataType("Max");
                    handleMaxView(total_registered_data, setChartData, setCountTotalRegisteredUsersValue)
                  } else if (currentSelectedValue == 'active_users') {
                    setGraphDataType("Max");
                    handleMaxView(active_users, setChartData, setCountActiveUsersValue)
                  }
                  else if (currentSelectedValue == 'nfts_sold') {
                    setGraphDataType("Max");
                    handleMaxView(nfts_sold_data, setChartData, setCountNFTSSoldValue)
                  }
                  else if (currentSelectedValue == 'new_registration') {
                    setGraphDataType("Max");
                    handleMaxView(new_registration, setChartData, setCountNewRegistration)
                  }
                  else if (currentSelectedValue == 'daily_avg_registration') {
                    setGraphDataType("Max");
                    handleMaxView(daily_avg_registration_data, setChartData, setCountDailyAvgRegistration)
                  }
                }}
                style={{
                  flexDirection: "column",
                  backgroundColor: `${graphDataType == "Max" ? "rgb(61, 18, 26)" : "#8B37A9"
                    }`,
                }}
              >
                <h5 className="white">Max</h5>
                {/* <h5 className="light-grey">432</h5> */}
                <div className="d-flex center">
                  {/* <img src={trending_up} style={{ width: 25 }} /> */}
                  {/* <h5 className="green ms-2 mb-0">2.54%</h5> */}
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
