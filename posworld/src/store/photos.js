import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customAxios, fileAxios } from "../http/CustomAxios";
import { deletePhotos, getPhotoById, postPhoto, putPhoto } from "./photosApi";

const initialState = {
  photos: {},
  myPhoto: {
    title: "",
    img: "",
    content: "",
  },
  allPhoto: {
    photos: [],
    loading: false,
    message: "",
  },
};

const INSERT_PHOTO = "INSERT_PHOTO";
const UPDATE_PHOTO = "UPDATE_PHOTO";
const DELETE_PHOTO = "DELETE_PHOTO";
const SELECT_PHOTO = "SELECT_PHOTO";

export const insertPhoto = createAsyncThunk(
  INSERT_PHOTO,
  async (payload, thunkAPI) => {
    const { myId } = thunkAPI.getState().users.me;
    const { photos } = thunkAPI.getState().photos.allPhoto.photos;
    let filePath = "";
    const { title, content, img, file, userId } = payload;

    let uploadFile = new FormData();
    uploadFile.append("file", file);
    if (file) {
      filePath = await fileAxios("/upload", "post", uploadFile);
    }

    const photo = {
      title,
      content,
      img: filePath ? filePath : img,
      userId,
    };
    const myPhoto = await postPhoto(photo);
    return myPhoto;
  }
);

export const updatePhoto = createAsyncThunk(
  UPDATE_PHOTO,
  async (payload, thunkAPI) => {
    const { myId } = thunkAPI.getState().users.me.id;
    const { photos } = thunkAPI.getState().photos.allPhoto.photos;

    let filePath = "";
    const { id, title, content, img, file, userId } = payload;
    let uploadFile = new FormData();
    uploadFile.append("file", file);
    if (file) {
      filePath = await fileAxios("/upload", "post", uploadFile);
    }

    const photo = {
      id,
      title,
      content,
      img: filePath ? filePath : img,
      userId,
    };

    const myPhoto = await putPhoto(photo, payload);
    return myPhoto;
  }
);

export const deletePhoto = createAsyncThunk(
  DELETE_PHOTO,
  async (payload, thunkAPI) => {
    const { photos } = thunkAPI.getState().photos.allPhoto.photos;
    return await deletePhotos(photos, payload);
  }
);

export const selectPhoto = createAsyncThunk(
  SELECT_PHOTO,
  async (payload, thunkAPI) => {
    const id = thunkAPI.getState().users.me.id;
    if (id) {
      const allPhoto = await getPhotoById(Number(id));
      return allPhoto;
    }
  }
);

export const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(insertPhoto.fulfilled, (state, { payload }) => {
        const newPhoto = { ...state.allPhoto };
        newPhoto.loading = false;
        if (payload) {
          newPhoto.photos = payload;
        }
        return { ...state, allPhoto: newPhoto };
      })
      .addCase(updatePhoto.fulfilled, (state, { payload }) => {
        const newPhoto = { ...state.allPhoto };
        newPhoto.loading = false;
        if (payload) {
          newPhoto.photos = payload;
        }
        return { ...state, allPhoto: newPhoto };
      })
      .addCase(deletePhoto.fulfilled, (state, { payload }) => {
        const newPhoto = { ...state.allPhoto };
        newPhoto.loading = false;
        if (payload) {
          newPhoto.photos = payload;
        }
        return { ...state, allPhoto: newPhoto };
      })
      .addCase(selectPhoto.fulfilled, (state, { payload }) => {
        console.log("success");
        const newPhoto = { ...state.allPhoto };
        newPhoto.loading = false;
        if (payload) {
          newPhoto.photos = payload;
          newPhoto.message = "사진이 있습니다.";
        } else {
          newPhoto.message = "사진이 없습니다";
        }
        return { ...state, allPhoto: newPhoto };
      })
      .addCase(selectPhoto.rejected, (state, { error }) => {
        console.log("rejected");
        const newPhoto = { ...state.allPhoto };
        newPhoto.loading = false;
        newPhoto.message = error.message;
        return { ...state, allPhoto: newPhoto };
      });
  },
});

export default photosSlice.reducer;
