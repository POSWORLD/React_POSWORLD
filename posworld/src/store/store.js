import { configureStore, combineReducers } from '@reduxjs/toolkit';
import users from './users';
import homes from './home';
import pComments from './pComments';

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
