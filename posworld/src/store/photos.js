import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fileAxios } from "../http/CustomAxios";
import {
  deletePhotos,
  getPhotoById,
  getPhotoByPhotoId,
  postPhoto,
  putPhoto,
} from "./photosApi";

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
const SELECT_PHOTO_BY_ID = "SELECT_PHOTO_BY_ID";

export const insertPhoto = createAsyncThunk(
  INSERT_PHOTO,
  async (payload, thunkAPI) => {
    const { myToken } = thunkAPI.getState().users;
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
      userId: Number(myToken),
    };
    const myPhoto = await postPhoto(photo);
    return myPhoto;
  }
);

export const updatePhoto = createAsyncThunk(
  UPDATE_PHOTO,
  async (payload, thunkAPI) => {
    const { myToken } = thunkAPI.getState().users;
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
      userId: Number(myToken),
    };

    const myPhoto = await putPhoto(photos, photo);
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
    const { myToken } = thunkAPI.getState().users;
    if (myToken) {
      const allPhoto = await getPhotoById(Number(myToken));
      return allPhoto;
    }
  }
);

export const selectPhotoById = createAsyncThunk(
  SELECT_PHOTO_BY_ID,
  async (payload, thunkAPI) => {
    if (payload) {
      const onePhoto = await getPhotoByPhotoId(Number(payload));
      return onePhoto;
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
        return { ...state, photos: payload };
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
        const newPhoto = { ...state.allPhoto };
        newPhoto.loading = false;
        newPhoto.message = error.message;
        return { ...state, allPhoto: newPhoto };
      })
      .addCase(selectPhotoById.fulfilled, (state, { payload }) => {
        return { ...state, photos: payload };
      });
  },
});

export default photosSlice.reducer;
