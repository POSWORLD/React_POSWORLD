import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHomeApi } from "./homesApi";

const initialState = {
  myhome: {},
  otherhome: {},
};

const SELECT_HOME = "SELECT_HOME";
const SELECT_OHTER_HOME = "SELECT_OHTER_HOME";

export const getHome = createAsyncThunk(SELECT_HOME, async (id) => {
  return await getHomeApi(id);
});

export const getOtherHome = createAsyncThunk(SELECT_OHTER_HOME, async (id) => {
  return await getHomeApi(id);
});

export const homesSlice = createSlice({
  name: "homes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHome.fulfilled, (state, { payload }) => {
      console.log("홈바뀜", payload);
      return { ...state, myhome: payload };
    });
  },
});

export default homesSlice.reducer;
