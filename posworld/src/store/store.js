
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import users from './users';
import pComments from './pComments';
import boards from './boards';
import photos from "./photos";

const reducer = combineReducers({
   users,
   pComments,
   boards,
  photos,
});
export default configureStore({
   reducer,
   devTools: true,
   middleware: getDefaultMiddleWare => [...getDefaultMiddleWare()],
});
