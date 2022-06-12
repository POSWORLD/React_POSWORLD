import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Users } from '../Data/User';
import { checkId, loginApi, postUser } from './usersApi';
const initialState = {
   users: Users,
   myId: localStorage.getItem('token'),
   isLogin: localStorage.getItem('token') === undefined ? true : false,
   me: {},
};

const CHECK_ID = 'CHECK_ID';
const LOGIN = 'LOGIN';
const INSERT_USER = 'INSERT_USER';

export const getCheckId = createAsyncThunk(CHECK_ID, async (userId, thunkAPI) => {
   const { users } = thunkAPI.getState().users;
   return await checkId(users, userId);
});

export const insertUser = createAsyncThunk(INSERT_USER, async (user, thunkAPI) => {
   const { users } = thunkAPI.getState().users;
   const newUser = await postUser(users, user);
   return newUser;
});
export const login = createAsyncThunk(LOGIN, async (user, thunkAPI) => {
   const { users } = thunkAPI.getState().users;
   const isLogin = await loginApi(users, user);
   return isLogin;
});
export const usersSlice = createSlice({
   name: 'users',
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder.addCase(insertUser.fulfilled, (state, { payload }) => {
         return { ...state, users: payload };
      });
   },
});
export default usersSlice.reducer;
