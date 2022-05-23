import React, { useEffect, useState, useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import {
  Dashboard,
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
  VideoGallery,
  NotFound,
} from "../../containers/index";
import { useSelector } from "react-redux";

function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const Router = () => {
  //   const data = useSelector((state) => state.auth.user);
  //   const [userData, setUserData] = useState("");
  //   useEffect(() => {
  //     let data = localStorage.getItem("userData");
  //     setUserData(data);
  //   }, []);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="collections" element={<Collections />} />
        <Route path="transaction-history" element={<TransactionHistory />} />
        <Route path="selling-history" element={<SellingHistory />} />
        <Route path="purchase-history" element={<PurchaseHistory />} />
        <Route path="account-settings" element={<AccountSettings />} />
        <Route path="account-settings/edit-profile" element={<EditProfile />} />
        <Route path="help-center" element={<HelpCenter />} />
        <Route path="privacy-security" element={<PrivacySecurity />} />
        <Route path="payment" element={<Payment />} />
        <Route path="video-gallery" element={<VideoGallery />} />
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
