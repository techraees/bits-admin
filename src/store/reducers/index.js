import { combineReducers } from "redux";
import AuthReducer from "./Auth";
import AppReducer from "./App";
import contractReducer from "./Contract";
import adminReducer from "../slices/admin";
import tranReducer from "./Transactions";
import AllTraReducer from "./AllTransactions";
import TopUserReducer from "./TopUsers";

export default combineReducers({
  auth: AuthReducer,
  app: AppReducer,
  adminDetails: adminReducer,
  contracts: contractReducer,
  totalTrans: tranReducer,
  allTrans: AllTraReducer,
  topUsers: TopUserReducer,
});
