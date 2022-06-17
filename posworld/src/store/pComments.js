import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCommentByPid, insertComment, deleteComment } from "./pCommentsApi";
const initialState = {
  pid: 0,
  comments: [],
  allPComment: {
    comments: [],
    loading: false,
    message: "",
  },
};

const INSERT_PCOMMENT = "INSERT_PCOMMENT";
const SELECT_PCOMMENT = "SELECT_PCOMMENT";
const DELETE_PCOMMENT = "DELETE_PCOMMENT";
const SET_PID = "SET_PID";

export const insertComments = createAsyncThunk(
  INSERT_PCOMMENT,
  async (payload, thunkAPI) => {
    const myId = thunkAPI.getState().users.me.id;
    const pid = payload.pid;
    const content = payload.content;
    const pComment = {
      content,
      userId: Number(myId),
      pid: Number(pid),
    };
    const newComment = await insertComment(pComment);
    return newComment;
  }
);

export const selectComments = createAsyncThunk(
  SELECT_PCOMMENT,
  async (payload, thunkAPI) => {
    const pid = thunkAPI.getState().pComments.pid;
    if (pid) {
      const comments = await getCommentByPid(Number(pid));
      return comments;
    }
  }
);

export const deleteComments = createAsyncThunk(
  DELETE_PCOMMENT,
  async (payload, thunkAPI) => {
    const comments = thunkAPI.getState().pComments.comments;
    return await deleteComment(comments, payload);
  }
);

export const setPids = createAsyncThunk(SET_PID, async (payload, thunkAPI) => {
  const pid = payload;
  return pid;
});

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(insertComments.fulfilled, (state, { payload }) => {
        const newComment = { ...state.allPComment };
        newComment.loading = false;
        return { ...state, allPComment: newComment };
      })
      .addCase(selectComments.fulfilled, (state, { payload }) => {
        const newComment = payload;

        return { ...state, comments: newComment };
      })
      .addCase(selectComments.rejected, (state, { error }) => {
        const newComment = { ...state.allPComment };
        newComment.loading = false;
        newComment.message = error.message;
        return { ...state, allPComment: newComment };
      })
      .addCase(deleteComments.fulfilled, (state, { payload }) => {
        const newComment = { ...state.allPComment };
        newComment.loading = false;
        if (payload) {
          newComment.comments = payload;
        }
        return { ...state, comments: payload };
      })
      .addCase(setPids.fulfilled, (state, { payload }) => {
        return { ...state, pid: payload };
      });
  },
});

export default commentSlice.reducer;
