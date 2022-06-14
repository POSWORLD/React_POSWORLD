import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCommentByPid, insertComment } from "./pCommentsApi";
const initialState = {
  allPComment: {
    comments: [],
    loading: false,
    message: "",
  },
};

const INSERT_PCOMMENT = "INSERT_PCOMMENT";
const SELECT_PCOMMENT = "SELECT_PCOMMENT";

export const insertComments = createAsyncThunk(
  INSERT_PCOMMENT,
  async (payload) => {
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

export const selectComments = createAsyncThunk(SELECT_PCOMMENT, async () => {
  const pid = "1"; // {pid} = thunkAPI.getState().posts or token something;
  if (pid) {
    const comments = await getCommentByPid(Number(pid));
    return comments;
  }
});

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(insertComments.fulfilled, (state, { payload }) => {
        return { ...state, comments: payload };
      })
      .addCase(selectComments.pending, (state, { payload }) => {
        const newComment = { ...state.allPComment };
        newComment.loading = true;
        return { ...state, allPComment: newComment };
      })
      .addCase(selectComments.fulfilled, (state, { payload }) => {
        const newComment = { ...state.allPComment };
        newComment.loading = false;
        if (payload) {
          newComment.comments = payload;
        } else {
          newComment.message = "댓글이 없습니다.";
        }
        return { ...state, allPComment: newComment };
      })
      .addCase(selectComments.rejected, (state, { error }) => {
        const newComment = { ...state.allPComment };
        newComment.loading = false;
        newComment.message = error.message;
        return { ...state, allPComment: newComment };
      });
  },
});

export default commentSlice.reducer;
