import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fileAxios } from "../http/CustomAxios";
import {
  getUserApi,
  getUserCountApi,
  idCheckApi,
  insertUserApi,
  loginApi,
  loginCheckApi,
  logoutApi,
  updateUserApi,
  deleteUserApi,
} from "./usersApi";

const initialState = {
  myToken: localStorage.getItem("token"),
  isLogin: localStorage.getItem("token") === undefined ? true : false,
  myId: localStorage.getItem("myId"),
  me: {},
  other: {},
  myProfile: {
    profiles: [],
    loading: false,
  },
};

const LOGIN = "LOGIN";
const LOGIN_CHECK = "LOGIN_CHECK";
const CHECK_ID = "CHECK_ID";
const INSERT_USER = "INSERT_USER";
const SELECT_USER_BY_ID = "SELECT_USER_BY_ID";
const LOGOUT = "LOGOUT";
const UPDATE_USERS = "UPDATE_USERS";
const SELECT_COUNT_USER = "SELECT_COUNT_USER";
const DELETE_USER = "DELETE_USER";

export const login = createAsyncThunk(LOGIN, async (user) => {
  const response = await loginApi(user);
  return response;
});

export const loginCheck = createAsyncThunk(
  LOGIN_CHECK,
  async (user, thunkAPI) => {
    const myToken = thunkAPI.getState().users;
    if (myToken) {
      const me = await loginCheckApi();
      return me;
    }
    return;
  }
);

export const idCheck = createAsyncThunk(CHECK_ID, async (user) => {
  return await idCheckApi(user);
});

export const insertUser = createAsyncThunk(INSERT_USER, async (user) => {
  return await insertUserApi(user);
});

export const updateUser = createAsyncThunk(
  UPDATE_USERS,
  async (payload, thunkAPI) => {
    const myToken = thunkAPI.getState().users;

    let filePath = "";
    const { userid, name, prophoto, file } = payload;
    let uploadFile = new FormData();
    uploadFile.append("file", file);
    if (file) {
      filePath = await fileAxios("/img/upload", "post", uploadFile);
    }
    const user = {
      userid,
      name,
      prophoto: filePath ? filePath : prophoto,
    };

    const response = await updateUserApi(user);
    return response;
  }
);

export const countUser = createAsyncThunk(SELECT_COUNT_USER, async () => {
  return await getUserCountApi();
});

export const logout = createAsyncThunk(LOGOUT, async (payload, thunkAPI) => {
  const { myToken } = thunkAPI.getState().users;
  const isLogout = await logoutApi(myToken);
  return isLogout;
});

export const getUser = createAsyncThunk(
  SELECT_USER_BY_ID,
  async (id, thunkAPI) => {
    const response = await getUserApi(id);
    return response;
  }
);

export const deleteUser = createAsyncThunk(
  DELETE_USER,
  async (payload, thunkAPI) => {
    return await deleteUserApi(payload);
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        if (payload.isLogin) {
          localStorage.setItem("token", payload.user.accessToken);
          return { ...state, isLogin: true };
        } else {
          return { ...state, isLogin: false };
        }
      })
      .addCase(login.rejected, (state, { payload }) => {
        return { ...state, isLogin: false };
      })
      .addCase(loginCheck.fulfilled, (state, { payload }) => {
        if (payload) {
          localStorage.setItem("myId", payload.id);
          return { ...state, isLogin: true, me: payload, myId: payload.id };
        } else {
          localStorage.removeItem("myId");
          return { ...state, isLogin: false };
        }
      })
      .addCase(loginCheck.rejected, (state, { payload }) => {
        return { ...state, isLogin: false };
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const user = payload;
        const newProfile = { ...state.myProfile };
        newProfile.loading = true;
        if (payload) {
          newProfile.profiles = payload;
          newProfile.loading = false;
        }
        return {
          ...state,
          me: { ...state.me, ...user },
          myProfile: newProfile,
        };
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        localStorage.clear();
        return { ...state, isLogin: false, me: {}, myToken: "", myId: "" };
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        if (payload) {
          const newProfile = { ...state.myProfile };
          newProfile.loading = false;
          if (payload) {
            newProfile.profiles = payload;
          }

          return { ...state, other: payload, myProfile: newProfile };
        } else {
          return 0;
        }
      });
  },
});

export default usersSlice.reducer;
