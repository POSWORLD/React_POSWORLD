import { configureStore, combineReducers } from '@reduxjs/toolkit';
import users from './users';
import pComments from './pComments';
import boards from './boards';
import photos from "./photos";
import homes from './homes';

const reducer = combineReducers({
   users,
   pComments,
   boards,
  photos,
   homes,
});
export default configureStore({
   reducer,
   devTools: true,
   middleware: getDefaultMiddleWare => [...getDefaultMiddleWare()],

});
