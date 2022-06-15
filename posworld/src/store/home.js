import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fileAxios } from '../http/CustomAxios';
import { updateHomeApi } from './homeApi';

const initialState = {
    home: [],
    loading: false,
    message: '',
};

const UPDATE_HOME = 'UPDATE_HOME';

export const updateHome = createAsyncThunk(
    UPDATE_HOME,
    async (payload, thunkAPI) => {
        const { myToken } = thunkAPI.getState().users;

        let filePath = '';
        const { content, photo, file } = payload;
        // let uploadFile = new FormData();
        // uploadFile.append("file", file);
        // if (file) {
        //   filePath = await fileAxios("/upload", "post", uploadFile);
        // }
        const home = {
            content,
            // photo: filePath ? filePath : photo,
            photo: photo,
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
    name: 'home',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updateHome.fulfilled, (state, { payload }) => {
            return { ...state, home: payload };
        });
    },
});
export default homeSlice.reducer;
