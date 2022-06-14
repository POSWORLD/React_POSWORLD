import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customAxios } from "../http/CustomAxios";
import { postPhoto } from "./photosApi";

const initialState = {
  myPhoto: {
    title: "",
    img: "",
    content: "",
  },
};

const INSERT_PHOTO = "INSERT_PHOTO";
const UPDATE_PHOTO = "UPDATE_PHOTO";
const DELETE_PHOTO = "DELETE_PHOTO";

export const insertPhoto = createAsyncThunk(
  INSERT_PHOTO,
  /*  async (payload, thunkAPI) => {
        let formData = new FormData();
        formData.append("file", payload.file);
        await fileUpload("post", "/upload", formData);
        const removeFilePost = { ...payload, file: "", img: `/${payload.file.name}` };
        const isInsert = await postPost(removeFilePost);
        console.log(isInsert);
        if (isInsert === 1) {
            console.log(isInsert);
            useDispatch(selectMyPost());
        }
    } */
  async (payload, thunkAPI) => {
    const { myId } = thunkAPI.getState().users;
    const { photos } = thunkAPI.getState().photos;
    let filePath = "";
    const { content, img, file } = payload;
    if (file) {
      filePath = await customAxios("/upload", "photo", file);
    }

    const photo = {
      content,
      img: filePath ? filePath : img,
      userId: Number(myId),
    };

    const myPhoto = await postPhoto(photos, photo);
    return myPhoto;
  }
);

export const updatePhoto = createAsyncThunk(
  UPDATE_PHOTO,
  async (payload, thunkAPI) => {
    const { myId } = thunkAPI.getState().users;
    const { photos } = thunkAPI.getState().photos;

    let filePath = "";
    const { content, img, file } = payload;
    if (file) {
      filePath = await customAxios("/upload", "photo", file);
    }

    const photo = {
      content,
      img: filePath ? filePath : img,
      userId: Number(myId),
    };

    const myPhoto = await postPhoto(photos, photo);
    return myPhoto;
  }
);

export const deletePhoto = createAsyncThunk(
  DELETE_PHOTO,
  async (payload, thunkAPI) => {
    return await deletePhoto(payload);
    /* const isDelete = await deletePhoto(payload); */
  }
);

export const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(insertPhoto.fulfilled, (state, { payload }) => {
        return { ...state, photos: payload };
      })
      .addCase(updatePhoto.fulfilled, (state, { payload }) => {
        const { newPhoto } = payload;
        return { ...state, myPhoto: newPhoto };
      })
      .addCase(deletePhoto.fulfilled, (state, { payload }) => {
        return { ...state, photos: payload };
      });
  },
});

export default photosSlice.reducer;
