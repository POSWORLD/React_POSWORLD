import { configureStore, combineReducers } from '@reduxjs/toolkit';
import users from './users';
import photos from './photos';

const reducer = combineReducers({
    users,
    photos,
});
export default configureStore({
    reducer,
    devTools: true,
    middleware: (getDefaultMiddleWare) => [...getDefaultMiddleWare()],
});
