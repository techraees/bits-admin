import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Login,
  Home,
} from "../../containers/index";
import { useSelector } from "react-redux";

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
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
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
