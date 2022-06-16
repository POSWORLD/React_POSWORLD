
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { customAxios, fileAxios } from '../http/CustomAxios';

import { getHomeApi, updateHomeApi } from './homesApi';

const initialState = {
   home: {},
  otherhome: {},
};
const SELECT_HOME = 'SELECT_HOME';
const UPDATE_HOME = 'UPDATE_HOME';
const SELECT_OHTER_HOME = "SELECT_OHTER_HOME";

export const getHome = createAsyncThunk(SELECT_HOME, async (id) => {
    return await getHomeApi(id);
});
export const updateHome = createAsyncThunk(
    UPDATE_HOME,
    async (payload, thunkAPI) => {
        let filePath = '';
        const { title, content, photo, file } = payload;
        let uploadFile = new FormData();
        uploadFile.append('file', file);
        console.log(file);
        if (file) {
            filePath = await fileAxios('/upload', 'post', uploadFile);
        }
        // let uploadFile = new FormData();
        // uploadFile.append("file", file);
        // if (file) {
        //   filePath = await fileAxios("/upload", "post", uploadFile);
        // }
        const home = {
            title,
            content,
            photo: filePath ? filePath : photo,
        };
        console.log('들어가는거', home);
        const response = await updateHomeApi(home);
        return response;
    }

    // const { myId } = thunkAPI.getState().users;
    // const { home } = thunkAPI.getState().home;
    // let filePath = '';
    // const { content, photo, file } = payload;
    // let uploadFile = new FormData();
    // uploadFile.append('file', file);

    // if (file) {
    //     filePath = await fileAxios('/upload', 'post', uploadFile);
    // }

    // const homes = { content, photo: filePath ? filePath : photo, userId: Number(myId) };
    // const Home = await updateHomeApi(home, homes, myId);
    // return Home;
);
export const homeSlice = createSlice({
    name: 'homes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHome.fulfilled, (state, { payload }) => {
                console.log('홈바뀜', payload);
                return { ...state, home: payload };
            })
            .addCase(updateHome.fulfilled, (state, { payload }) => {
                return { ...state, home: payload };
            });
    },
});
export default homeSlice.reducer;

