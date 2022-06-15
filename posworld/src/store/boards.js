import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Board } from '../data/Board';
import { deleteBoardById, deleteBoardByNum, getBoardByHomeId, getMyBoards, insertBoard, postBoard } from './boardsApi';

const initialState = {
   allBoard: {
      boards: [],
      loading: false,
      message: '',
   },
};

const SELECT_BOARD = 'SELECT_BOARD';
const INSERT_BOARD = 'INSERT_BOARD';
const DELETE_BOARD = 'DELETE_BOARD';

export const selectBoards = createAsyncThunk(SELECT_BOARD, async (payload, thunkAPI) => {
   const homeId = 2;
   //const { boards } = thunkAPI.getState().boards;
   if (homeId) {
      const boards = await getBoardByHomeId(Number(homeId));
      return boards;
   }
});

export const insertBoards = createAsyncThunk(
   INSERT_BOARD, //
   async (payload, thunkAPI) => {
      const myId = '1';
      const homeId = '2';
      //const { boards } = thunkAPI.getState().boards;
      const { content } = payload;
      const board = {
         friendId: Number(myId),
         homeId: Number(homeId),
         content,
      };
      const newBoard = await insertBoard(board);
      return newBoard;
   },
);
export const deleteBoard = createAsyncThunk(DELETE_BOARD, async (payload, thunkAPI) => {
   const { boards } = thunkAPI.getState().boards;
   return deleteBoardByNum(boards, payload);
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
               newBoard.message = '방명록이 비어있습니다.';
            }
            return { ...state, allBoard: newBoard };
         })
         .addCase(selectBoards.rejected, (state, { error }) => {
            const newBoard = { ...state.allBoard };
            newBoard.loading = false;
            newBoard.message = error.message;
            return { ...state, allBoard: newBoard };
         });
   },
});

export default boardSlice.reducer;
