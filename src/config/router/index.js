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
  UserProfile,
} from "../../containers/index";

const Router = () => {
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
        <Route
          path="/user-information/user-profile/:id"
          element={<UserProfile />}
        />
        <Route path="*" element={<NotFound />} />
        <Route />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
