import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCommentByPid, insertComment, deleteComment } from "./pCommentsApi";
import { deletePhoto } from "./photosApi";
const initialState = {
  comments: {},
  allPComment: {
    comments: [],
    loading: false,
    message: "",
  },
};

const INSERT_PCOMMENT = "INSERT_PCOMMENT";
const SELECT_PCOMMENT = "SELECT_PCOMMENT";
const DELETE_PCOMMENT = "DELETE_PCOMMENT";

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
  async (pid, thunkAPI) => {
    if (pid) {
      const comments = await getCommentByPid(Number(pid));
      console.log(comments);
      return comments;
    }
  }
);

export const deleteComments = createAsyncThunk(
  DELETE_PCOMMENT,
  async (payload, thunkAPI) => {
    const { comments } = thunkAPI.getState().pComments.allPComment.comments;
    return await deleteComment(comments, payload);
  }
);

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
        return { ...state, comments: newComment };
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
      })
      .addCase(deleteComments.fulfilled, (state, { payload }) => {
        const newComment = { ...state.allPComment };
        newComment.loading = false;
        if (payload) {
          newComment.comments = payload;
        }
        return { ...state, allPComment: newComment };
      });
  },
});

export default commentSlice.reducer;
