import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customAxios, fileAxios } from "../http/CustomAxios";

import { getHomeApi, updateHomeApi } from "./homesApi";

const initialState = {
  homeId: localStorage.getItem("myId"),
  home: {},
  otherhome: {},
};
const SELECT_HOME = "SELECT_HOME";
const UPDATE_HOME = "UPDATE_HOME";
const SELECT_OHTER_HOME = "SELECT_OHTER_HOME";
const SET_HOME_ID = "SET_HOME_ID";

export const getHome = createAsyncThunk(
  SELECT_HOME,
  async (payload, thunkAPI) => {
    if (payload) {
      const myhome = await getHomeApi(Number(payload));
      return myhome;
    }
  }
);

export const getOtherHome = createAsyncThunk(
  SELECT_OHTER_HOME,
  async (payload, thunkAPI) => {
    if (payload) {
      const myOtherhome = await getHomeApi(Number(payload));
      return myOtherhome;
    }
  }
);

export const updateHome = createAsyncThunk(
  UPDATE_HOME,
  async (payload, thunkAPI) => {
    let filePath = "";
    const id = thunkAPI.getState().users.me.id;
    const { title, content, photo, file } = payload;
    let uploadFile = new FormData();

    uploadFile.append("file", file);
    if (file) {
      filePath = await fileAxios("/img/upload", "post", uploadFile);
    }
    const home = {
      title,
      content,
      photo: filePath ? filePath : photo,
    };
    const response = await updateHomeApi(home, Number(id));
    if (response == 1) {
      return home;
    }
    return;
  }
);

export const setHomeId = createAsyncThunk(
  SET_HOME_ID,
  async (payload, thunkAPI) => {
    const homeId = payload;
    localStorage.setItem("homeId", payload);
    return homeId;
  }
);

export const homeSlice = createSlice({
  name: "homes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHome.fulfilled, (state, { payload }) => {
        return { ...state, home: payload, homeId: payload.id };
      })
      .addCase(updateHome.fulfilled, (state, { payload }) => {
        return { ...state, home: payload };
      })
      .addCase(getOtherHome.fulfilled, (state, { payload }) => {
        localStorage.setItem("homeId", payload.id);
        return { ...state, otherhome: payload, homeId: payload.id };
      })
      .addCase(setHomeId.fulfilled, (state, { payload }) => {
        return { ...state, homeId: payload };
      });
  },
});
export default homeSlice.reducer;
