import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import {
  GET_ALL_NOTIFICATIONS,
  GET_NEW_REGISTRATION,
  GET_USERS_COUNT,
  GET_ALL_CONTACTS,
} from "../../gql/queries";
import { useQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import polygonMarketContractAbi from "../../abis/polygonMarketContractAbi.json";
import {
  likes,
  nfts,
  topNfts,
  visits,
  users as registerdUsers,
} from "./sampleData";

import { ethers } from "ethers";
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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  elements: {
    line: {
      tension: 0.5,
    },
  },
  scales: {
    y: {
      grid: {
        color: "rgba(255, 255, 255, 0.2)",
      },
    },
  },
};

const getLables = (type) => {
  // let currentDate = new Date(); // Get current date
  // let currentDay = currentDate.getDay(); // Get the current day (0-6)
  // let firstDayOfWeek = new Date(currentDate); // Copy current date
  // firstDayOfWeek.setDate(currentDate.getDate() - currentDay); // Set first day of the week (Sunday)

  // let dates = []; // Array to store dates of the week

  // // Options for formatting the date
  // let options = { day: "2-digit", month: "long" };

  // // Loop to get dates of the week
  // for (let i = 0; i < 7; i++) {
  //   let tempDate = new Date(firstDayOfWeek); // Copy first day of the week
  //   tempDate.setDate(firstDayOfWeek.getDate() + i); // Increment date by i days
  //   dates.push(tempDate.toLocaleDateString("en-US", options)); // Push formatted date to array
  // }

  // return dates; // Return arr

  return visits
    .map((item, i) => {
      return new Date(item.timestamp).getFullYear();
    })
    .filter((value, index, self) => self.indexOf(value) === index);
};

const labels = getLables("Max");

export const data = {
  labels,
  datasets: [
    {
      label: "Visits",
      data: labels
        .map((date, index) =>
          visits.map((item, i) => {
            if (
              parseInt(new Date(item.timestamp).getFullYear()) == parseInt(date)
            ) {
              return parseInt(new Date(item.timestamp).getFullYear());
            } else {
              return;
            }
          })
        )
        .map((subArray) => subArray.filter((value) => value).length),
      borderColor: "#24318D",
      backgroundColor: "#24318D",
      shadowColor: "#24318D",
    },
    {
      label: "Watch time",
      data: labels.map(() =>
        faker.datatype.number({
          min: 0,
          max: Math.max(
            ...labels
              .map((date, index) =>
                visits.map((item, i) => {
                  if (
                    parseInt(new Date(item.timestamp).getFullYear()) ==
                    parseInt(date)
                  ) {
                    return parseInt(new Date(item.timestamp).getFullYear());
                  } else {
                    return;
                  }
                })
              )
              .map((subArray) => subArray.filter((value) => value).length)
          ),
        })
      ),
      borderColor: "#fff",
      backgroundColor: "#fff",
      shadowColor: "#fff",
    },
  ],
};

function completeYearRange(years) {
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const completeRange = [];

  for (let year = minYear; year <= maxYear; year++) {
    completeRange.push(year);
  }

  return completeRange;
}

function getCurrentWeekDates() {
  const currentDate = new Date();
  const currentDay = currentDate.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
  const firstDayOfWeek = new Date(currentDate); // Copy current date
  firstDayOfWeek.setDate(currentDate.getDate() - currentDay); // Set to first day of the week

  // Initialize an array to store the formatted dates of the week
  const formattedWeekDates = [];

  // Array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Loop to generate and format dates for the week
  for (let i = 0; i < 7; i++) {
    const date = new Date(firstDayOfWeek);
    date.setDate(firstDayOfWeek.getDate() + i);

    // Format the date as "dd month"
    const formattedDate = `${String(date.getDate()).padStart(2, "0")} ${
      monthNames[date.getMonth()]
    }`;
    formattedWeekDates.push(formattedDate);
  }

  return formattedWeekDates;
}

function getCurrentMonthDatesFormatted() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get the first day of the current month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);

  // Initialize an array to store the formatted dates of the month
  const formattedMonthDates = [];

  // Array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Loop through the days of the month
  for (
    let day = 1;
    day <= new Date(currentYear, currentMonth + 1, 0).getDate();
    day++
  ) {
    const date = new Date(currentYear, currentMonth, day);
    // Format the date as "dd month"
    const formattedDate = `${String(date.getDate()).padStart(2, "0")} ${
      monthNames[date.getMonth()]
    }`;
    formattedMonthDates.push(formattedDate);
  }

  return formattedMonthDates;
}

const Dashboard = () => {
  const [likesData, setLikesData] = useState(likes);
  const [nftsData, setNftsData] = useState(nfts);
  const [topNftsData, setTopNftsData] = useState(topNfts);
  const [visitsData, setVisitsData] = useState(visits);
  const [registeredUsersData, setRegisteredUsersData] =
    useState(registerdUsers);
  const [nftsSoldData, setNftsSoldData] = useState(
    nfts.filter((item) => item.isPaid == true)
  );
  const [newRegisterations, setNewRegisterations] = useState(
    registeredUsersData.slice(0, 5)
  );

  // States to show n graph Box
  const [visitDataGraphValue, setvisitDataGraphValue] = useState(
    visitsData.length
  );
  const [registerdUserGraphValue, setregisterdUserGraphValue] = useState(
    registeredUsersData.length
  );
  const [loginUserGraphValue, setloginUserGraphValue] = useState(
    registeredUsersData.filter((item) => item.is_login).length
  );
  const [nftSoldGraphValue, setnftSoldGraphValue] = useState(
    nftsSoldData.length
  );
  const [newRegGraphValue, setnewRegGraphValue] = useState(
    newRegisterations.length
  );

  const getLables = (type, ghraphToShowtype) => {
    if (type == "Max") {
      if (ghraphToShowtype == "Total Registered users") {
        return completeYearRange(
          registeredUsersData
            .map((item, i) => {
              return new Date(item.createdAt).getFullYear();
            })
            .sort((a, b) => a - b)
            .filter((value, index, self) => self.indexOf(value) === index)
        );
      } else if (ghraphToShowtype == "Active users") {
        return completeYearRange(
          registeredUsersData
            .map((item, i) => {
              if (item.is_login) {
                return new Date(item.createdAt).getFullYear();
              }
            })
            .sort((a, b) => a - b)
            .filter((value, index, self) => self.indexOf(value) === index)
        );
      } else if (ghraphToShowtype == "Unique Visitors") {
        return completeYearRange(
          visitsData
            .map((item, i) => {
              return new Date(item.timestamp).getFullYear();
            })
            .sort((a, b) => a - b)
            .filter((value, index, self) => self.indexOf(value) === index)
        );
      } else if (ghraphToShowtype == "Total Visits") {
        console.log("Condtion Matched");

        return completeYearRange(
          visitsData
            .map((item, i) => {
              return new Date(item.timestamp).getFullYear();
            })
            .sort((a, b) => a - b)
            .filter((value, index, self) => self.indexOf(value) === index)
        );
      } else if (ghraphToShowtype == "NFTs Sold") {
        return completeYearRange(
          nftsSoldData
            .map((item, i) => {
              return new Date(item.createdAt).getFullYear();
            })
            .sort((a, b) => a - b)
            .filter((value, index, self) => self.indexOf(value) === index)
        );
      } else if (ghraphToShowtype == "New Registrations") {
        return completeYearRange(
          newRegisterations.map((item) =>
            new Date(item.createdAt).getFullYear()
          )
        );
      }
    } else if (type == "Week") {
      return getCurrentWeekDates();
    } else if (type == "Month") {
      return getCurrentMonthDatesFormatted();
    } else if (type == "Year") {
      // Get the current date
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return monthNames;
    }
  };
  let topUsersDatas = [
    {
      name: "John",
      status: "Speedy walkover",
      value: "8.2k",
    },
    {
      name: "Katty",
      status: "Speedy walkover",
      value: "8.2k",
    },
    {
      name: "Hannah",
      status: "Speedy walkover",
      value: "8.2k",
    },
    {
      name: "John",
      status: "Speedy walkover",
      value: "8.2k",
    },
    {
      name: "Katty",
      status: "Speedy walkover",
      value: "8.2k",
    },
    {
      name: "Hannah",
      status: "Speedy walkover",
      value: "8.2k",
    },
    {
      name: "Katty",
      status: "Speedy walkover",
      value: "8.2k",
    },
    {
      name: "Hannah",
      status: "Speedy walkover",
      value: "8.2k",
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

  const [dataArr, setDataArr] = useState(data);

  const {
    loading,
    error,
    data: totalRegistered,
    refetch,
  } = useQuery(GET_USERS_COUNT);
  // console.log("totalRegistered", totalRegistered?.GetAllUsersCount);
  const navigate = useNavigate();

  const { data: allNotifications } = useQuery(GET_ALL_NOTIFICATIONS);
  // console.log("allNotifications", allNotifications);

  const { data: newRegistration } = useQuery(GET_NEW_REGISTRATION);
  // console.log("newRegistration", newRegistration);

  const {
    loading: contactsLoading,
    error: contactsError,
    data: contactData,
    refetch: dataRefetch,
  } = useQuery(GET_ALL_CONTACTS);

  const { topUsersData } = useSelector((state) => state.topUsers.topUsersData);
  const contracts = useSelector((state) => state.contracts);

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

  // console.log("contractEvents", contractEvents);

  const [ghraphToShow, setGhraphToShow] = useState({
    type: "Total Visits",
    bg: "#2F49D1",
  });
  const [graphDataType, setGraphDataType] = useState("Max");

  const setGraph = (type, min, value, color) => {
    setGhraphToShow({ type, bg: color });
    const labels = getLables(graphDataType, type);
    let data = [];
    if (graphDataType == "Max") {
      if (type == "Total Visits") {
        data = labels
          .map((date, index) =>
            visits.map((item, i) => {
              if (
                parseInt(new Date(item.timestamp).getFullYear()) ==
                parseInt(date)
              ) {
                return parseInt(new Date(item.timestamp).getFullYear());
              } else {
                return;
              }
            })
          )
          .map((subArray) => subArray.filter((value) => value).length);
      } else if (type == "Total Registered users") {
        data = labels
          .map((date, index) =>
            registeredUsersData.map((item, i) => {
              if (
                parseInt(new Date(item.createdAt).getFullYear()) ==
                parseInt(date)
              ) {
                return parseInt(new Date(item.createdAt).getFullYear());
              } else {
                return;
              }
            })
          )
          .map((subArray) => subArray.filter((value) => value).length);
      } else if (type == "Unique Visitors") {
        data = labels
          .map((date, index) =>
            visits.map((item, i) => {
              if (
                parseInt(new Date(item.timestamp).getFullYear()) ==
                parseInt(date)
              ) {
                return parseInt(new Date(item.timestamp).getFullYear());
              } else {
                return;
              }
            })
          )
          .map((subArray) => subArray.filter((value) => value).length);
      } else if (type == "Active users") {
        data = labels
          .map((date, index) =>
            registeredUsersData.map((item, i) => {
              if (
                parseInt(new Date(item.createdAt).getFullYear()) ==
                  parseInt(date) &&
                item.is_login
              ) {
                return parseInt(new Date(item.createdAt).getFullYear());
              } else {
                return;
              }
            })
          )
          .map((subArray) => subArray.filter((value) => value).length);
      } else if (type == "NFTs Sold") {
        data = labels
          .map((date, index) => {
            return nftsSoldData.map((item, i) => {
              if (
                parseInt(new Date(item.createdAt).getFullYear()) ==
                  parseInt(date) &&
                item.isPaid
              ) {
                return parseInt(new Date(item.createdAt).getFullYear());
              } else {
                return;
              }
            });
          })
          .map((subArray) => subArray.filter((value) => value).length);
      } else if (type == "New Registrations") {
        data = labels
          .map((date, index) => {
            return newRegisterations.map((item, i) => {
              if (
                parseInt(new Date(item.createdAt).getFullYear()) ==
                parseInt(date)
              ) {
                return parseInt(new Date(item.createdAt).getFullYear());
              } else {
                return;
              }
            });
          })
          .map((subArray) => subArray.filter((value) => value).length);
      }
    } else if (graphDataType == "Year") {
      if (type == "Total Visits") {
        data = labels.map(
          (monthname, monthindex) =>
            visits.filter((visit) => {
              const visitDate = new Date(visit.timestamp);
              const visitYear = visitDate.getFullYear();
              const visitMonth = visitDate.getMonth();

              // Check if the visit is in the current year and matches the month index
              return (
                visitYear === new Date().getFullYear() &&
                visitMonth === monthindex
              );
            }).length
        );
      } else if (type == "Total Registered users") {
        data = labels.map(
          (monthname, monthindex) =>
            registeredUsersData.filter((user) => {
              const userDate = new Date(user.createdAt);
              const userYear = userDate.getFullYear();
              const userMonth = userDate.getMonth();

              // Check if the visit is in the current year and matches the month index
              return (
                userYear === new Date().getFullYear() &&
                userMonth === monthindex
              );
            }).length
        );
      } else if (type == "Unique Visitors") {
        data = labels.map(
          (monthname, monthindex) =>
            visits.filter((visit) => {
              const visitDate = new Date(visit.timestamp);
              const visitYear = visitDate.getFullYear();
              const visitMonth = visitDate.getMonth();

              // Check if the visit is in the current year and matches the month index
              return (
                visitYear === new Date().getFullYear() &&
                visitMonth === monthindex
              );
            }).length
        );
      } else if (type == "Active Users") {
        data = labels.map(
          (monthname, monthindex) =>
            registeredUsersData.filter((user) => {
              const userDate = new Date(user.createdAt);
              const userYear = userDate.getFullYear();
              const userMonth = userDate.getMonth();

              // Check if the visit is in the current year and matches the month index
              return (
                userYear === new Date().getFullYear() &&
                userMonth === monthindex &&
                user.is_login
              );
            }).length
        );
      } else if (type == "NFTs Sold") {
        data = labels.map(
          (monthname, monthindex) =>
            nftsSoldData.filter((nft) => {
              const nftDate = new Date(nft.createdAt);
              const nftYear = nftDate.getFullYear();
              const nftMonth = nftDate.getMonth();
              return (
                nftYear === new Date().getFullYear() && nftMonth === monthindex
              );
            }).length
        );
      } else if (type == "New Registrations") {
        data = labels.map(
          (monthname, monthindex) =>
            newRegisterations.filter((newReg) => {
              const newRegDate = new Date(newReg.createdAt);
              const newRegYear = newRegDate.getFullYear();
              const newRegMonth = newRegDate.getMonth();
              return (
                newRegYear === new Date().getFullYear() &&
                newRegMonth === monthindex
              );
            }).length
        );
      }
    } else if (graphDataType == "Month") {
      if (type == "Total Visits") {
        data = labels.map((date, dateindex) => {
          let monthindex = new Date(date).getMonth();
          // Get the start and end dates for the current month
          const dateFilter = new Date(date);

          // Filter visits for the current month and dates within that month
          const visitsForMonth = visitsData.filter((visit) => {
            const visitDate = new Date(visit.timestamp);
            return visitDate.getDate() == dateFilter.getDate();
          });

          // Return the count of visits for the month
          return visitsForMonth.length;
        });
      } else if (type == "Unique Visitors") {
        data = labels.map((date, dateindex) => {
          // Get the start and end dates for the current month
          const dateFilter = new Date(date);

          // Filter visits for the current month and dates within that month
          const visitsForMonth = visitsData.filter((visit) => {
            const visitDate = new Date(visit.timestamp);
            return visitDate.getDate() == dateFilter.getDate();
          });

          // Return the count of visits for the month
          return visitsForMonth.length;
        });
      } else if (type == "Total Registered users") {
        data = labels.map((date, dateindex) => {
          // Get the start and end dates for the current month
          const dateFilter = new Date(date);
          // const endDate = new Date(new Date(Date).getFullYear(), monthindex + 1, 0);

          // Filter visits for the current month and dates within that month
          const visitsForMonth = registeredUsersData.filter((user) => {
            const userDate = new Date(user.createdAt);
            return userDate.getDate() == dateFilter.getDate();
          });

          // Return the count of visits for the month
          return visitsForMonth.length;
        });
      } else if (type == "Active users") {
        data = labels.map((date, dateindex) => {
          // Get the start and end dates for the current month
          const dateFilter = new Date(date);
          // const endDate = new Date(new Date(Date).getFullYear(), monthindex + 1, 0);

          // Filter visits for the current month and dates within that month
          const visitsForMonth = registeredUsersData.filter((user) => {
            const userDate = new Date(user.createdAt);
            return userDate.getDate() == dateFilter.getDate() && user.is_login;
          });

          // Return the count of visits for the month
          return visitsForMonth.length;
        });
      } else if (type == "NFTs Sold") {
        data = labels.map((date, dateindex) => {
          // Get the start and end dates for the current month
          const dateFilter = new Date(date);
          // const endDate = new Date(new Date(Date).getFullYear(), monthindex + 1, 0);

          // Filter visits for the current month and dates within that month
          const visitsForMonth = nftsSoldData.filter((nft) => {
            const nftDate = new Date(nft.createdAt);
            return nftDate.getDate() == dateFilter.getDate();
          });

          // Return the count of visits for the month
          return visitsForMonth.length;
        });
      } else if (type == "New Registrations") {
        data = labels.map((date, dateindex) => {
          // Get the start and end dates for the current month
          const dateFilter = new Date(date);
          // const endDate = new Date(new Date(Date).getFullYear(), monthindex + 1, 0);

          // Filter visits for the current month and dates within that month
          const visitsForMonth = newRegisterations.filter((newReg) => {
            const newRegDate = new Date(newReg.createdAt);
            return newRegDate.getDate() == dateFilter.getDate();
          });

          // Return the count of visits for the month
          return visitsForMonth.length;
        });
      }
    } else if (graphDataType == "Week") {
      if (type == "Total Visits") {
        data = labels.map((date, dateindex) => {
          // Calculate the start and end dates for the last week
          const currentDate = new Date();
          const dateFilter = new Date(date);

          // Filter visits for the last week
          const visitsForWeek = visitsData.filter((visit) => {
            const visitDate = new Date(visit.timestamp);
            return visitDate.getDate() == dateFilter.getDate();
          });

          // Return the count of visits for the last week
          return visitsForWeek.length;
        });
      } else if (type == "Unique Visitors") {
        data = labels.map((date, dateindex) => {
          // Get the start and end dates for the current month
          const dateFilter = new Date(date);

          // Filter visits for the current month and dates within that month
          const visitsForWeek = visitsData.filter((visit) => {
            const visitDate = new Date(visit.timestamp);
            return visitDate.getDate() == dateFilter.getDate();
          });

          // Return the count of visits for the month
          return visitsForWeek.length;
        });
      } else if (type == "Total Registered users") {
        data = labels.map((date, dateindex) => {
          // Get the start and end dates for the current month
          const dateFilter = new Date(date);
          // const endDate = new Date(new Date(Date).getFullYear(), monthindex + 1, 0);

          // Filter visits for the current month and dates within that month
          const visitsForWeek = registeredUsersData.filter((user) => {
            const userDate = new Date(user.createdAt);
            return userDate.getDate() == dateFilter.getDate();
          });

          // Return the count of visits for the month
          return visitsForWeek.length;
        });
      } else if (type == "Active users") {
        data = labels.map((date, dateindex) => {
          // Get the start and end dates for the current month
          const dateFilter = new Date(date);
          // const endDate = new Date(new Date(Date).getFullYear(), monthindex + 1, 0);

          // Filter visits for the current month and dates within that month
          const visitsForWeek = registeredUsersData.filter((user) => {
            const userDate = new Date(user.createdAt);
            return userDate.getDate() == dateFilter.getDate() && user.is_login;
          });

          // Return the count of visits for the month
          return visitsForWeek.length;
        });
      } else if (type == "NFTs Sold") {
        data = labels.map((date, dateindex) => {
          // Get the start and end dates for the current month
          const dateFilter = new Date(date);
          // const endDate = new Date(new Date(Date).getFullYear(), monthindex + 1, 0);

          // Filter visits for the current month and dates within that month
          const visitsForWeek = nftsSoldData.filter((nft) => {
            const nftDate = new Date(nft.createdAt);
            return nftDate.getDate() == dateFilter.getDate();
          });

          // Return the count of visits for the month
          return visitsForWeek.length;
        });
      } else if (type == "New Registrations") {
        data = labels.map((date, dateindex) => {
          // Get the start and end dates for the current month
          const dateFilter = new Date(date);
          // const endDate = new Date(new Date(Date).getFullYear(), monthindex + 1, 0);

          // Filter visits for the current month and dates within that month
          const visitsForWeek = newRegisterations.filter((newReg) => {
            const newRegDate = new Date(newReg.createdAt);
            return newRegDate.getDate() == dateFilter.getDate();
          });

          // Return the count of visits for the month
          return visitsForWeek.length;
        });
      }
    }
    const dataToSet = {
      labels,
      datasets: [
        {
          label: type,
          data,
          borderColor: color,
          backgroundColor: color,
        },
        // {
        //   label: "Watch time",
        //   data: labels.map(() =>
        //     faker.datatype.number({ min: 1000, max: 100000 })
        //   ),
        //   borderColor: "#fff",
        //   backgroundColor: "#fff",
        //   shadowColor: "#fff",
        // },
      ],
    };
    setDataArr(dataToSet);
    setGhraphToShow({ type, bg: color });
  };

  useEffect(() => {
    setGraph("Total Visits", 23, 24, "#2F49D1");
  }, [graphDataType]);

  useEffect(() => {
    if (graphDataType == "Max") {
      setvisitDataGraphValue(visitsData.length);
      setregisterdUserGraphValue(registeredUsersData.length);
      setloginUserGraphValue(
        registeredUsersData.filter((item) => item.is_login).length
      );
      setnftSoldGraphValue(nftsSoldData.length);
      setnewRegGraphValue(newRegisterations.length);
    }
    if (graphDataType == "Year") {
      setvisitDataGraphValue(
        labels.map((monthname, monthindex) =>
          visits.filter((visit) => {
            const visitDate = new Date(visit.timestamp);
            const visitYear = visitDate.getFullYear();
            const visitMonth = visitDate.getMonth();

            // Check if the visit is in the current year and matches the month index
            return (
              visitYear === new Date().getFullYear() &&
              visitMonth === monthindex
            );
          })
        ).length
      );
      setregisterdUserGraphValue(
        labels.map((monthname, monthindex) =>
          registeredUsersData.filter((user) => {
            const userDate = new Date(user.createdAt);
            const userYear = userDate.getFullYear();
            const userMonth = userDate.getMonth();

            // Check if the visit is in the current year and matches the month index
            return (
              userYear === new Date().getFullYear() && userMonth === monthindex
            );
          })
        ).length
      );
      setloginUserGraphValue(
        labels.map((monthname, monthindex) =>
          registeredUsersData.filter((user) => {
            const userDate = new Date(user.createdAt);
            const userYear = userDate.getFullYear();
            const userMonth = userDate.getMonth();

            // Check if the visit is in the current year and matches the month index
            return (
              userYear === new Date().getFullYear() &&
              userMonth === monthindex &&
              user.is_login
            );
          })
        ).length
      );
      setnftSoldGraphValue(
        labels.map((monthname, monthindex) =>
          nftsSoldData.filter((nft) => {
            const nftDate = new Date(nft.createdAt);
            const nftYear = nftDate.getFullYear();
            const nftMonth = nftDate.getMonth();
            return (
              nftYear === new Date().getFullYear() && nftMonth === monthindex
            );
          })
        ).length
      );
      setnewRegGraphValue(
        labels.map((monthname, monthindex) =>
          newRegisterations.filter((newReg) => {
            const newRegDate = new Date(newReg.createdAt);
            const newRegYear = newRegDate.getFullYear();
            const newRegMonth = newRegDate.getMonth();
            return (
              newRegYear === new Date().getFullYear() &&
              newRegMonth === monthindex
            );
          })
        ).length
      );
    }
    if (graphDataType == "Month") {
      setvisitDataGraphValue(
        labels.map((date, dateindex) => {
          let monthindex = new Date(date).getMonth();
          // Get the start and end dates for the current month
          const dateFilter = new Date(date);

          // Filter visits for the current month and dates within that month
          const visitsForMonth = visitsData.filter((visit) => {
            const visitDate = new Date(visit.timestamp);
            return visitDate.getDate() == dateFilter.getDate();
          });

          // Return the count of visits for the month
          return visitsForMonth;
        }).length
      );
      setregisterdUserGraphValue(
        labels.map((date, dateindex) => {
          // Get the start and end dates for the current month
          const dateFilter = new Date(date);

          // Filter visits for the current month and dates within that month
          const visitsForMonth = visitsData.filter((visit) => {
            const visitDate = new Date(visit.timestamp);
            return visitDate.getDate() == dateFilter.getDate();
          });

          // Return the count of visits for the month
          return visitsForMonth;
        }).length
      );
      setloginUserGraphValue(
        labels.map((date, dateindex) => {
          // Get the start and end dates for the current month
          const dateFilter = new Date(date);
          // const endDate = new Date(new Date(Date).getFullYear(), monthindex + 1, 0);

          // Filter visits for the current month and dates within that month
          const visitsForMonth = registeredUsersData.filter((user) => {
            const userDate = new Date(user.createdAt);
            return userDate.getDate() == dateFilter.getDate();
          });

          // Return the count of visits for the month
          return visitsForMonth;
        }).length
      );
      setnftSoldGraphValue(
        labels.map((date, dateindex) => {
          // Get the start and end dates for the current month
          const dateFilter = new Date(date);
          // const endDate = new Date(new Date(Date).getFullYear(), monthindex + 1, 0);

          // Filter visits for the current month and dates within that month
          const visitsForMonth = nftsSoldData.filter((nft) => {
            const nftDate = new Date(nft.createdAt);
            return nftDate.getDate() == dateFilter.getDate();
          });

          // Return the count of visits for the month
          return visitsForMonth;
        }).length
      );
      setnewRegGraphValue(
        labels.map((date, dateindex) => {
          // Get the start and end dates for the current month
          const dateFilter = new Date(date);
          // const endDate = new Date(new Date(Date).getFullYear(), monthindex + 1, 0);

          // Filter visits for the current month and dates within that month
          const visitsForMonth = newRegisterations.filter((newReg) => {
            const newRegDate = new Date(newReg.createdAt);
            return newRegDate.getDate() == dateFilter.getDate();
          });

          // Return the count of visits for the month
          return visitsForMonth;
        }).length
      );
    }
    if (graphDataType == "Week") {
      setvisitDataGraphValue(
        labels.map((date, dateindex) => {
          // Calculate the start and end dates for the last week
          const currentDate = new Date();
          const dateFilter = new Date(date);

          // Filter visits for the last week
          const visitsForWeek = visitsData.filter((visit) => {
            const visitDate = new Date(visit.timestamp);
            return visitDate.getDate() == dateFilter.getDate();
          });

          // Return the count of visits for the last week
          return visitsForWeek;
        }).length
      );
      setregisterdUserGraphValue(
        labels.map((date, dateindex) => {
          // Get the start and end dates for the current month
          const dateFilter = new Date(date);
          // const endDate = new Date(new Date(Date).getFullYear(), monthindex + 1, 0);

          // Filter visits for the current month and dates within that month
          const visitsForWeek = registeredUsersData.filter((user) => {
            const userDate = new Date(user.createdAt);
            return userDate.getDate() == dateFilter.getDate();
          });

          // Return the count of visits for the month
          return visitsForWeek;
        }).length
      );
      setloginUserGraphValue(
        labels.map((date, dateindex) => {
          // Get the start and end dates for the current month
          const dateFilter = new Date(date);
          // const endDate = new Date(new Date(Date).getFullYear(), monthindex + 1, 0);

          // Filter visits for the current month and dates within that month
          const visitsForWeek = registeredUsersData.filter((user) => {
            const userDate = new Date(user.createdAt);
            return userDate.getDate() == dateFilter.getDate() && user.is_login;
          });

          // Return the count of visits for the month
          return visitsForWeek;
        }).length
      );
      setnftSoldGraphValue(
        labels.map((date, dateindex) => {
          // Get the start and end dates for the current month
          const dateFilter = new Date(date);
          // const endDate = new Date(new Date(Date).getFullYear(), monthindex + 1, 0);

          // Filter visits for the current month and dates within that month
          const visitsForWeek = nftsSoldData.filter((nft) => {
            const nftDate = new Date(nft.createdAt);
            return nftDate.getDate() == dateFilter.getDate();
          });

          // Return the count of visits for the month
          return visitsForWeek;
        }).length
      );
      setnewRegGraphValue(
        labels.map((date, dateindex) => {
          // Get the start and end dates for the current month
          const dateFilter = new Date(date);
          // const endDate = new Date(new Date(Date).getFullYear(), monthindex + 1, 0);

          // Filter visits for the current month and dates within that month
          const visitsForWeek = newRegisterations.filter((newReg) => {
            const newRegDate = new Date(newReg.createdAt);
            return newRegDate.getDate() == dateFilter.getDate();
          });

          // Return the count of visits for the month
          return visitsForWeek;
        }).length
      );
    }
  }, [graphDataType]);

  return (
    <div className="bg-dark-blue">
      <NavbarComponent selectedKey={"1"} />
      <div className="container py-4 dashboardContainer">
        <h5 className="white">Dashboard</h5>
        <div className="row card-data">
          <StatisticsCard
            icon={bar_chart}
            // count={totalRegistered?.GetAllUsersCount?.totalVisits}
            count={visitDataGraphValue}
            status={"Total Visits"}
            onClick={(e) =>
              setGraph(
                "Total Visits",
                100,
                // totalRegistered?.GetAllUsersCount?.totalVisits,
                visitsData.length,
                "#2F49D1"
              )
            }
            ghraphToShow={ghraphToShow}
            // trendingIcon={trending_up}
            // trendingPer={"0.24"}
            // duration={"Last month"}
            // perColor={"green"}
            // iconBgColor={"#232645"}
          />
          <StatisticsCard
            icon={user2}
            // count={totalRegistered?.GetAllUsersCount?.uniqueVisitors}
            count={visitDataGraphValue}
            status={"Unique Visitors"}
            onClick={(e) =>
              setGraph(
                "Unique Visitors",
                100,
                // totalRegistered?.GetAllUsersCount?.uniqueVisitors,
                visitsData.length,
                "#FFB748"
              )
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
            count={registerdUserGraphValue}
            status={"Total Registered users"}
            // trendingIcon={trending_down}
            // trendingPer={"20"}
            // duration={"Last month"}
            // perColor={"red2"}
            // iconBgColor={"#282347"}
            onClick={(e) =>
              setGraph(
                "Total Registered users",
                100,
                // totalRegistered?.GetAllUsersCount?.registered,
                registeredUsersData.length,
                "#EA2EC1"
              )
            }
            ghraphToShow={ghraphToShow}
          />
          <StatisticsCard
            icon={users}
            // count={totalRegistered?.GetAllUsersCount?.active}
            count={loginUserGraphValue}
            status={"Active users"}
            // trendingIcon={trending_up2}
            // trendingPer={"20"}
            // duration={"Last month"}
            // perColor={"yellow"}
            // iconBgColor={"#26353f"}
            onClick={(e) =>
              setGraph(
                "Active users",
                100,
                // totalRegistered?.GetAllUsersCount?.active,
                registerdUsers.filter((item) => item.is_login).length,
                "#3386C1"
              )
            }
            ghraphToShow={ghraphToShow}
          />
        </div>
        <div className="row data">
          <div className="col-lg-9">
            <div className="graph">
              <Line options={options} data={dataArr} />
            </div>
            <div className="row visits-data">
              <div
                className="col-lg-4 cursor-pointer"
                onClick={(e) => {
                  setGraphDataType("Week");
                }}
              >
                <div
                  className="radius2 d-flex center my-3 pb-4 pt-5"
                  style={{
                    flexDirection: "column",
                    backgroundColor: `${
                      graphDataType == "Week" ? "#2a2a57" : "#8BA937"
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
                  setGraphDataType("Month");
                }}
              >
                <div
                  className="radius2 d-flex center my-3 pb-4 pt-5"
                  style={{
                    flexDirection: "column",
                    backgroundColor: `${
                      graphDataType == "Month" ? "#2a2a57" : "#246390"
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
                  setGraphDataType("Year");
                }}
              >
                <div
                  className="radius2 d-flex center my-3 pb-4 pt-5"
                  style={{
                    flexDirection: "column",
                    backgroundColor: `${
                      graphDataType == "Year" ? "#2a2a57" : "#B52269"
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
                  <img src={refresh} className="cursor" />
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
                  <img src={refresh} className="cursor" />
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
                backgroundColor: `${
                  ghraphToShow.type == "NFTs Sold"
                    ? "rgb(61, 18, 26)"
                    : "#222235"
                }`,
              }}
              onClick={(e) => setGraph("NFTs Sold", 100, 200, "#8B37A9")}
            >
              <h5 className="white mb-1">NFTs Sold</h5>
              <h5 className="red m-0">{nftSoldGraphValue}</h5>
            </div>
            <div
              className="radius2 d-flex center py-4 my-4  cursor-pointer"
              style={{
                flexDirection: "column",
                height: "8.5rem",
                justifyContent: "center",
                backgroundColor: `${
                  ghraphToShow.type == "New Registrations"
                    ? "rgb(61, 18, 26)"
                    : "#222235"
                }`,
              }}
              onClick={(e) =>
                setGraph(
                  "New Registrations",
                  100,
                  (newRegistration?.newRegistration?.count / 30).toFixed(4) ||
                    0,
                  "#8B37A9"
                )
              }
            >
              <h5 className="white mb-1">New Registrations</h5>
              <h5 className="red m-0">{newRegGraphValue}</h5>
            </div>
            <div
              className="radius2 d-flex center py-4 my-4  cursor-pointer"
              style={{
                flexDirection: "column",
                height: "8.5rem",
                justifyContent: "center",
                backgroundColor: `${
                  ghraphToShow.type == "Daily Avg Registrations"
                    ? "rgb(61, 18, 26)"
                    : "#222235"
                }`,
              }}
              onClick={(e) =>
                setGraph(
                  "Daily Avg Registrations",
                  100,
                  (newRegistration?.newRegistration?.count / 7).toFixed(4) || 0,
                  "#8B37A9"
                )
              }
            >
              <h5 className="white mb-1">Daily Avg Registrations</h5>
              <h5 className="red m-0">
                {(newRegistration?.newRegistration?.count / 7).toFixed(4) || 0}
              </h5>
            </div>

            <div
              className="radius2 d-flex center my-3 pb-4 pt-5 cursor-pointer"
              onClick={(e) => setGraphDataType("Max")}
              style={{
                flexDirection: "column",
                backgroundColor: `${
                  graphDataType == "Max" ? "rgb(61, 18, 26)" : "#8B37A9"
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
                                {/* <span className="light-grey">{e.status}</span> */}
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
                                {/* <span className="light-grey">{e.status}</span> */}
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
    </div>
  );
};

export default Dashboard;
