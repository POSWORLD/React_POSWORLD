import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { customAxios, fileAxios } from '../http/CustomAxios';

import { getHomeApi, updateHomeApi } from './homesApi';

const initialState = {
   homeId: 0,
   home: {},
   otherhome: {},
};
const SELECT_HOME = 'SELECT_HOME';
const UPDATE_HOME = 'UPDATE_HOME';
const SELECT_OHTER_HOME = 'SELECT_OHTER_HOME';
const SET_HOME_ID = 'SET_HOME_ID';

export const getHome = createAsyncThunk(SELECT_HOME, async (payload, thunkAPI) => {
   if (payload) {
      const myhome = await getHomeApi(Number(payload));
      return myhome;
   }
});

export const getOtherHome = createAsyncThunk(SELECT_OHTER_HOME, async (payload, thunkAPI) => {
   console.log('파도타기', payload);
   if (payload) {
      const myOtherhome = await getHomeApi(Number(payload));
      console.log('myotherhome', myOtherhome);
      return myOtherhome;
   }
});

export const updateHome = createAsyncThunk(UPDATE_HOME, async (payload, thunkAPI) => {
   let filePath = '';

   const id = thunkAPI.getState().users.me.id;
   //console.log(id);
   const { title, content, photo, file } = payload;
   let uploadFile = new FormData();
   uploadFile.append('file', file);
   if (file) {
      filePath = await fileAxios('/upload', 'post', uploadFile);
   }
   const home = {
      title,
      content,
      photo: filePath ? filePath : photo,
    };
    const response = await updateHomeApi(home, Number(id));
    if(response==1){
      return home;
    }return;
  }
);

export const setHomeId = createAsyncThunk(SET_HOME_ID, async (payload, thunkAPI) => {
   console.log('change', payload);
   const homeId = payload;
   return homeId;
});

export const homeSlice = createSlice({
   name: 'homes',
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder
         .addCase(getHome.fulfilled, (state, { payload }) => {
            return { ...state, home: payload, homeId: payload.id };
         })
         .addCase(updateHome.fulfilled, (state, { payload }) => {
            return { ...state, home: payload };
         })
         .addCase(getOtherHome.fulfilled, (state, { payload }) => {
            return { ...state, otherhome: payload, homeId: payload.id };
         })
         .addCase(setHomeId.fulfilled, (state, { payload }) => {
            return { ...state, homeId: payload };
         });
   },
});
export default homeSlice.reducer;
