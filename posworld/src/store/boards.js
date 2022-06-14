import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Board } from '../data/Board';
import { deleteBoardById, getMyBoards, insertBoard, postBoard } from './boardsApi';

const initialState = {
   allBoard: {
      boards: [],
      loading: false,
      message: '',
   },
};

const SELECT_MY_BOARD = 'SELECT_MY_BOARD';
const INSERT_BOARD = 'INSERT_BOARD';

export const selectMyBoard = createAsyncThunk(SELECT_MY_BOARD, async (payload, thunkAPI) => {
   const myId = 1;
   const { boards } = thunkAPI.getState().boards;
   if (myId) {
      const myBoards = await getMyBoards(boards, Number(myId));
      return myBoards;
   } else if (myId === 0 || myId === '0') {
      const myBoards = await getMyBoards(boards, Number(myId));
      return myBoards;
   }
   return;
});

// export const deleteBoard = createAsyncThunk(DELETE_BOARD, async (payload, thunkAPI) => {
//    const { boards } = thunkAPI.getState().boards;

//    return deleteBoardById(boards, payload);
// });

// export const insertBoards = createAsyncThunk(
//    INSERT_BOARD, //
//    async (payload, thunkAPI) => {
//       const { myId } = thunkAPI.getState().users;
//       const { boards } = thunkAPI.getState().boards;
//       const { content, img } = payload;

//       const board = { content, img, userId: Number(myId) };
//       const myBoards = await postBoard(boards, board);
//       return myBoards;
//    },
// );
export const boardSlice = createSlice({
   name: 'board',
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder
         .addCase(selectMyBoard.pending, (state, { payload }) => {
            const newMyBoards = { ...state.myBoards };
            newMyBoards.loading = true;
            return { ...state, myBoards: newMyBoards };
         })
         .addCase(selectMyBoard.fulfilled, (state, { payload }) => {
            const newMyBoards = { ...state.myBoards };
            newMyBoards.loading = false;
            if (payload) {
               newMyBoards.boards = payload;
               return { ...state, myBoards: newMyBoards };
            } else {
               newMyBoards.message = '방명록이 비어있습니다.';
               return { ...state, myBoards: newMyBoards };
            }
         });
   },
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
export default boardSlice.reducer;
