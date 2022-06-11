import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import DocumentSlice from "./DocumentSlice";
import CertificateSlice from "./CertificateSlice";
import Auth from "./Auth";
const reducer = combineReducers({
  DocumentSlice: DocumentSlice,
  CertificateSlice: CertificateSlice,
  AuthUser: Auth,
  // here we will be adding reducers
});
const store = configureStore({
  reducer,
});
export default store;
