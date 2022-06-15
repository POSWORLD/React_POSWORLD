import { configureStore, combineReducers, createSlice } from "@reduxjs/toolkit";
import users from "./users";
import pComments from "./pComments";
import homes from "./homes";

const reducer = combineReducers({
  users,
  pComments,
  homes,
});
export default configureStore({
  reducer,
  devTools: true,
  middleware: (getDefaultMiddleWare) => [...getDefaultMiddleWare()],
});
