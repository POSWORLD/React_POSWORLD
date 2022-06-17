import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customAxios, fileAxios } from "../http/CustomAxios";

import { getHomeApi, updateHomeApi } from "./homesApi";

const initialState = {
  home: {},
  otherhome: {},
};
const SELECT_HOME = "SELECT_HOME";
const UPDATE_HOME = "UPDATE_HOME";
const SELECT_OHTER_HOME = "SELECT_OHTER_HOME";

export const getHome = createAsyncThunk(
  SELECT_HOME,
  async (payload, thunkAPI) => {
    console.log("시작해볼까", payload);
    if (payload) {
      const myhome = await getHomeApi(Number(payload));
      console.log("myhome", myhome);
      return myhome;
    }
  }
);
export const updateHome = createAsyncThunk(
  UPDATE_HOME,
  async (payload, thunkAPI) => {
    let filePath = "";
    const { myToken } = thunkAPI.getState().users;
    const { title, content, photo, file } = payload;
    let uploadFile = new FormData();
    uploadFile.append("file", file);
    if (file) {
      filePath = await fileAxios("/upload", "post", uploadFile);
    }
    const home = {
      title,
      content,
      photo: filePath ? filePath : photo,
    };
    const response = await updateHomeApi(home, Number(myToken));
    return response;
  }
);
export const homeSlice = createSlice({
  name: "homes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHome.fulfilled, (state, { payload }) => {
        return { ...state, home: payload };
      })
      .addCase(updateHome.fulfilled, (state, { payload }) => {
        return { ...state, home: payload };
      });
  },
});
export default homeSlice.reducer;
