import { configureStore, combineReducers } from '@reduxjs/toolkit';
import users from './users';
import boards from './boards';

const reducer = combineReducers({
   users,
   boards,
});
export default configureStore({
   reducer,
   devTools: true,
   middleware: getDefaultMiddleWare => [...getDefaultMiddleWare()],
});
