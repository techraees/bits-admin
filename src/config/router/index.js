import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Dashboard,
  NotFound,
  UserInformation,
  DataSection,
  AdminSupport,
  Payment,
  PreviousNotes,
  Settings,
} from "../../containers/index";
// import { useSelector } from "react-redux";

const Router = () => {
  //   const data = useSelector((state) => state.auth.user);
  //   const [userData, setUserData] = useState("");
  //   useEffect(() => {
  //     let data = localStorage.getItem("userData");
  //     setUserData(data);
  //   }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user-information" element={<UserInformation />} />
        <Route path="/data-section" element={<DataSection />} />
        <Route path="/admin-support" element={<AdminSupport />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/previous-notes" element={<PreviousNotes />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
        {/* {(Object.keys(data).length > 0 || userData) && (
          <>
          </>
        )} */}
        {/* <Route path="*" element={<NotFound />} /> */}
        <Route />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
