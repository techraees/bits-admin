import { combineReducers } from "redux";
import AuthReducer from "./Auth";
import AppReducer from "./App";
import CreateNFtReducer from "./CreateNft";
import NFtAddressReducer from "./NftAddress";
import web3Reducer from "../slices/web3ConnectSlice";
import contractReducer from "../slices/contractSlice";

export default combineReducers({
  contract: contractReducer,
  auth: AuthReducer,
  app: AppReducer,
  nft: CreateNFtReducer,
  address: NFtAddressReducer,
  web3: web3Reducer,
});
