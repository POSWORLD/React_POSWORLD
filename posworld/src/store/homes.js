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

export const getHome = createAsyncThunk(SELECT_HOME, async (id) => {
  return await getHomeApi(id);
});
export const updateHome = createAsyncThunk(
  UPDATE_HOME,
  async (payload, thunkAPI) => {
    let filePath = "";
    const id = thunkAPI.getState().users.me.id;
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
    const response = await updateHomeApi(home, Number(id));
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
