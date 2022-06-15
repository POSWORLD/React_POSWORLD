import { configureStore, combineReducers } from '@reduxjs/toolkit';
import users from './users';
import pComments from './pComments';
import boards from './boards';

const reducer = combineReducers({
   users,
   pComments,
   boards,
});
export default configureStore({
   reducer,
   devTools: true,
   middleware: getDefaultMiddleWare => [...getDefaultMiddleWare()],
});
