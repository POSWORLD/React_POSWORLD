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
    const myId = thunkAPI.getState().users.myId;
    const pid = payload.pid;
    const content = payload.content;
    console.log(content);
    const pComment = {
      pid: Number(pid),
      userid: Number(myId),
      content,
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
    const myId = thunkAPI.getState().users.myId;
    const comments = thunkAPI.getState().pComments.comments;
    const id = payload;
    const ids = {
      myId: myId,
      id: payload,
    };
    return await deleteComment(comments, ids);
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
