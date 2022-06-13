import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customAxios, fileAxios } from "../http/CustomAxios";
import { insertComment } from "./pCommentsApi";
const initialState = {
  allComments: {
    comments: [],
    loading: false,
    message: "",
  },
};

const INSERT_PCOMMENT = "INSERT_PCOMMENT";

export const insertComments = createAsyncThunk(
  INSERT_PCOMMENT,
  async (payload, thunkAPI) => {
    const myId = "1"; //thunkAPI.getState().users;
    const pid = "1";
    //const { photo } = thunkAPI.getState().photos;
    const { content } = payload;
    const pComment = {
      content,
      userId: Number(myId),
      pid: Number(pid),
    };
    const newComment = await insertComment(pComment);
    return newComment;
  }
);

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(insertComments.fulfilled, (state, { payload }) => {
      return { ...state, comments: payload };
    });
  },
});

export default commentSlice.reducer;
