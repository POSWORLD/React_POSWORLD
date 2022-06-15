import { configureStore, combineReducers } from "@reduxjs/toolkit";
import users from "./users";
import pComments from "./pComments";
import photos from "./photos";

const reducer = combineReducers({
  users,
  pComments,
  photos,
});
export default configureStore({
  reducer,
  devTools: true,
  middleware: (getDefaultMiddleWare) => [...getDefaultMiddleWare()],
});
