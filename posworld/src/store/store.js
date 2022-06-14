import { configureStore, combineReducers } from "@reduxjs/toolkit";
import users from "./users";
import pComments from "./pComments";

const reducer = combineReducers({
  users,
  pComments,
});
export default configureStore({
  reducer,
  devTools: true,
  middleware: (getDefaultMiddleWare) => [...getDefaultMiddleWare()],
});
