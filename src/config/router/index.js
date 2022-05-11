import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Login,
  Collections,
  TransactionHistory,
  SellingHistory,
  PurchaseHistory,
  AccountSettings,
  EditProfile,
  HelpCenter,
  PrivacySecurity,
  Payment,
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
        <Route path="/" element={<Login />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/transaction-history" element={<TransactionHistory />} />
        <Route path="/selling-history" element={<SellingHistory />} />
        <Route path="/purchase-history" element={<PurchaseHistory />} />
        <Route path="/account-settings" element={<AccountSettings />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/privacy-security" element={<PrivacySecurity />} />
        <Route path="/payment" element={<Payment />} />
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
