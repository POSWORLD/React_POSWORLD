import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { idCheckApi, insertUserApi, loginApi, loginCheckApi, updateUserApi } from './usersApi';

const initialState = {
   myToken: localStorage.getItem('token'),
   isLogin: localStorage.getItem('token') === undefined ? true : false,
   me: {},
};

const LOGIN = 'LOGIN';
const LOGIN_CHECK = 'LOGIN_CHECK';
const CHECK_ID = 'CHECK_ID';
const INSERT_USER = 'INSERT_USER';
const SELECT_USER_BY_ID = 'SELECT_USER_BY_ID';
const SELECT_USER_BY_USERID = 'SELECT_USER_BY_USERID';
const LOGOUT = 'LOGOUT';
const UPDATE_USERS = 'UPDATE_USERS';
const SELECT_USER_BY_KEY = 'SELECT_USER_BY_KEY';

export const login = createAsyncThunk(LOGIN, async user => {
   return await loginApi(user);
});

export const loginCheck = createAsyncThunk(LOGIN_CHECK, async (user, thunkAPI) => {
   const myToken = thunkAPI.getState().users;
   if (myToken) {
      const me = await loginCheckApi();
      return me;
   }
   return;
});

export const idCheck = createAsyncThunk(CHECK_ID, async user => {
   return await idCheckApi(user);
});

export const insertUser = createAsyncThunk(INSERT_USER, async user => {
   return await insertUserApi(user);
});

export const updateUser = createAsyncThunk(UPDATE_USERS, async user => {
   const response = await updateUserApi(user);
   if (response === 1) {
      return user;
   }
   return;
});

export const usersSlice = createSlice({
   name: 'users',
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder
         .addCase(login.fulfilled, (state, { payload }) => {
            if (payload.isLogin) {
               localStorage.setItem('token', payload.user.token);
               return { ...state, isLogin: payload.login, me: payload.user };
            } else {
               return { ...state, isLogin: false };
            }
         })
         .addCase(login.rejected, (state, { payload }) => {
            console.log(payload);
            return { ...state, isLogin: false };
         })
         .addCase(loginCheck.fulfilled, (state, { payload }) => {
            if (payload) {
               return { ...state, isLogin: true, me: payload };
            } else {
               return { ...state, isLogin: false };
            }
         })
         .addCase(loginCheck.rejected, (state, { payload }) => {
            return { ...state, isLogin: false };
         })
         .addCase(insertUser.fulfilled, (state, { payload }) => {
            return { ...state, users: payload };
         })
         .addCase(updateUser.fulfilled, (state, { payload }) => {
            const user = payload;
            return { ...state, me: { ...state.me, ...user } };
         });
   },
});

export default usersSlice.reducer;
