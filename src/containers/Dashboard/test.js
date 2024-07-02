// const array = [3, 7, 2, 8, 4, 10];

// const maxValue = Math.max(...array);

// console.log(maxValue); // Output: 10

// // let oneWeekAgo = new Date();
// // oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
// // if (ghraphToShowtype == "Total Registered users") {
// //   return registeredUsersData
// //     .map((item, i) => {
// //       return new Date(item.createdAt).getFullYear();
// //     })
// //     .sort((a, b) => a - b)
// //     .filter((obj) => new Date(obj.createdAt) > oneWeekAgo)
// //     .filter((value, index, self) => self.indexOf(value) === index);
// // } else if (ghraphToShowtype == "Active users") {
// //   return registeredUsersData
// //     .map((item, i) => {
// //       if (item.is_login) {
// //         return new Date(item.createdAt).getFullYear();
// //       }
// //     })
// //     .sort((a, b) => a - b)
// //     .filter((obj) => new Date(obj.createdAt) > oneWeekAgo)
// //     .filter((value, index, self) => self.indexOf(value) === index);
// // } else if (ghraphToShowtype == "Unique Visitors") {
// //   return visitsData
// //     .map((item, i) => {
// //       return new Date(item.timestamp).getFullYear();
// //     })
// //     .sort((a, b) => a - b)
// //     .filter((obj) => new Date(obj.timestamp) > oneWeekAgo)
// //     .filter((value, index, self) => self.indexOf(value) === index);
// // } else if (ghraphToShowtype == "Total Visits") {
// //   return visitsData
// //     .map((item, i) => {
// //       return new Date(item.timestamp).getFullYear();
// //     })
// //     .sort((a, b) => a - b)
// //     .filter((obj) => new Date(obj.timestamp) > oneWeekAgo)
// //     .filter((value, index, self) => self.indexOf(value) === index);
// // }

// // Get the current date
// // let currentDate = new Date();
// // // Get the current month (months are zero-based in JavaScript)
// // let currentMonth = currentDate.getMonth();
// // // Get the current year
// // let currentYear = currentDate.getFullYear();
// // if (ghraphToShowtype == "Total Registered users") {
// //   return registeredUsersData
// //     .map((item, i) => {
// //       return new Date(item.createdAt).getFullYear();
// //     })
// //     .sort((a, b) => a - b)
// //     .filter(
// //       (obj) =>
// //         new Date(obj.createdAt).getMonth() === currentMonth &&
// //         new Date(obj.createdAt).getFullYear() === currentYear
// //     )
// //     .filter((value, index, self) => self.indexOf(value) === index);
// // } else if (ghraphToShowtype == "Active users") {
// //   return registeredUsersData
// //     .map((item, i) => {
// //       if (item.is_login) {
// //         return new Date(item.createdAt).getFullYear();
// //       }
// //     })
// //     .sort((a, b) => a - b)
// //     .filter(
// //       (obj) =>
// //         new Date(obj.createdAt).getMonth() === currentMonth &&
// //         new Date(obj.createdAt).getFullYear() === currentYear
// //     )
// //     .filter((value, index, self) => self.indexOf(value) === index);
// // } else if (ghraphToShowtype == "Unique Visitors") {
// //   return visitsData
// //     .map((item, i) => {
// //       return new Date(item.timestamp).getFullYear();
// //     })
// //     .sort((a, b) => a - b)
// //     .filter(
// //       (obj) =>
// //         new Date(obj.createdAt).getMonth() === currentMonth &&
// //         new Date(obj.createdAt).getFullYear() === currentYear
// //     )
// //     .filter((value, index, self) => self.indexOf(value) === index);
// // } else if (ghraphToShowtype == "Total Visits") {
// //   return visitsData
// //     .map((item, i) => {
// //       return new Date(item.timestamp).getFullYear();
// //     })
// //     .sort((a, b) => a - b)
// //     .filter(
// //       (obj) =>
// //         new Date(obj.createdAt).getMonth() === currentMonth &&
// //         new Date(obj.createdAt).getFullYear() === currentYear
// //     )
// //     .filter((value, index, self) => self.indexOf(value) === index);
// // }

// let currentDate = new Date();
// // Get the current year
// let currentYear = currentDate.getFullYear();
// if (ghraphToShowtype == "Total Registered users") {
//   return registeredUsersData
//     .map((item, i) => {
//       return new Date(item.createdAt).getFullYear();
//     })
//     .sort((a, b) => a - b)
//     .filter((obj) => new Date(obj.createdAt).getFullYear() === currentYear)
//     .filter((value, index, self) => self.indexOf(value) === index);
// } else if (ghraphToShowtype == "Active users") {
//   return registeredUsersData
//     .map((item, i) => {
//       if (item.is_login) {
//         return new Date(item.createdAt).getFullYear();
//       }
//     })
//     .sort((a, b) => a - b)
//     .filter((obj) => new Date(obj.createdAt).getFullYear() === currentYear)
//     .filter((value, index, self) => self.indexOf(value) === index);
// } else if (ghraphToShowtype == "Unique Visitors") {
//   return visitsData
//     .map((item, i) => {
//       return new Date(item.timestamp).getFullYear();
//     })
//     .sort((a, b) => a - b)
//     .filter((obj) => new Date(obj.createdAt).getFullYear() === currentYear)
//     .filter((value, index, self) => self.indexOf(value) === index);
// } else if (ghraphToShowtype == "Total Visits") {
//   return visitsData
//     .map((item, i) => {
//       return new Date(item.timestamp).getFullYear();
//     })
//     .sort((a, b) => a - b)
//     .filter((obj) => new Date(obj.createdAt).getFullYear() === currentYear)
//     .filter((value, index, self) => self.indexOf(value) === index);
// }

// console.log(;
