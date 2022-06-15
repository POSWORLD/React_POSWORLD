import { configureStore, combineReducers } from '@reduxjs/toolkit';
import users from './users';
import home from './home';
import pComments from './pComments';

const reducer = combineReducers({
    users,
    pComments,
    home,
});
export default configureStore({
    reducer,
    devTools: true,
    middleware: (getDefaultMiddleWare) => [...getDefaultMiddleWare()],
});
