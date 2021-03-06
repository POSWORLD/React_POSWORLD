import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteBoardByNum, getBoardByHomeId, insertBoard, putBoards } from './boardsApi';

const initialState = {
   board: {},
   allBoard: {
      boards: [],
      loading: false,
      message: '',
   },
};

const SELECT_BOARD = 'SELECT_BOARD';
const INSERT_BOARD = 'INSERT_BOARD';
const DELETE_BOARD = 'DELETE_BOARD';
const UPDATE_BOARD = 'UPDATE_BOARD';

export const selectBoards = createAsyncThunk(SELECT_BOARD, async (payload, thunkAPI) => {
   const homeId = localStorage.getItem(`homeId`);
   if (homeId) {
      const boards = await getBoardByHomeId(Number(homeId));
      return boards;
   }
});

export const insertBoards = createAsyncThunk(
   INSERT_BOARD, //
   async (payload, thunkAPI) => {
      const myId = thunkAPI.getState().users.myId;
      const homeId = localStorage.getItem(`homeId`);
      const { content } = payload;
      const board = {
         friendId: Number(myId),
         homeId: Number(homeId),
         content,
      };
      const newBoard = await insertBoard(board, myId);
      return newBoard;
   },
);
export const deleteBoard = createAsyncThunk(DELETE_BOARD, async (payload, thunkAPI) => {
   const boards = thunkAPI.getState().boards;
   return deleteBoardByNum(boards, payload);
});
export const updateBoard = createAsyncThunk(UPDATE_BOARD, async (payload, thunkAPI) => {
   const { myId } = thunkAPI.getState().users.me.id;
   const { boards } = thunkAPI.getState().boards.allBoard.boards;
   const homeId = thunkAPI.getState().homes.homeId;
   const { num, content } = payload;
   const board = {
      num,
      homeId: Number(homeId),
      content,
   };

   //const board = { content, num, friendId };
   const newBoard = await putBoards(board, payload.num);
   return newBoard;
});

export const boardSlice = createSlice({
   name: 'boards',
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder
         .addCase(selectBoards.pending, (state, { payload }) => {
            const newBoard = { ...state.allBoard };
            newBoard.loading = true;
            return { ...state, allBoard: newBoard };
         })
         .addCase(selectBoards.fulfilled, (state, { payload }) => {
            const newBoard = { ...state.allBoard };
            newBoard.loading = false;
            if (payload) {
               newBoard.boards = payload;
            } else {
               newBoard.message = '???????????? ??????????????????.';
            }
            return { ...state, allBoard: newBoard };
         })
         .addCase(selectBoards.rejected, (state, { error }) => {
            const newBoard = { ...state.allBoard };
            newBoard.loading = false;
            newBoard.message = error.message;
            return { ...state, allBoard: newBoard };
         })
         .addCase(insertBoards.fulfilled, (state, { payload }) => {
            const newBoard = { ...state.allBoard };
            newBoard.loading = false;
            if (payload) {
               newBoard.boards = payload;
            }
            return { ...state, boards: payload };
         })
         .addCase(deleteBoard.fulfilled, (state, { payload }) => {
            const newBoard = { ...state.allBoard };
            newBoard.loading = false;
            if (payload) {
               newBoard.boards = payload;
            }
            return { ...state, allBoard: newBoard };
         })
         .addCase(updateBoard.fulfilled, (state, { payload }) => {
            const newBoard = { ...state.allBoard };
            newBoard.loading = false;
            if (payload) {
               newBoard.boards = payload;
            }
            return { ...state, allBoard: newBoard };
         });
   },
});

export default boardSlice.reducer;
