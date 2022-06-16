import { configureStore, combineReducers } from '@reduxjs/toolkit';
import users from './users';
import pComments from './pComments';
import photos from './photos';
import homes from './homes';
const reducer = combineReducers({
    users,
    pComments,
    photos,
    homes,
});
export default configureStore({
    reducer,
    devTools: true,
    middleware: (getDefaultMiddleWare) => [...getDefaultMiddleWare()],
});
