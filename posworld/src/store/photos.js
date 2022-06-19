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
    const myId = thunkAPI.getState().users.myId;
    const { photos } = thunkAPI.getState().photos.allPhoto.photos;
    let filePath = "";
    const { title, content, img, file, userid } = payload;

    let uploadFile = new FormData();
    uploadFile.append("file", file);
    if (file) {
      filePath = await fileAxios("/upload", "post", uploadFile);
    }

    const photo = {
      title,
      content,
      img: filePath ? filePath : img,
      userid: Number(myId),
    };
    const myPhoto = await postPhoto(photo, myId);
    return myPhoto;
  }
);

export const updatePhoto = createAsyncThunk(
  UPDATE_PHOTO,
  async (payload, thunkAPI) => {
    const myId = thunkAPI.getState().users.myId;
    const pid = thunkAPI.getState().pComments.pid;
    const photoInfo = {
      myId: myId,
      id: pid,
    };
    let filePath = "";
    const { id, title, content, img, file, userid } = payload;
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
      userid: Number(myId),
    };

    const myPhoto = await putPhoto(photo, photoInfo);
    return myPhoto;
  }
);

export const deletePhoto = createAsyncThunk(
  DELETE_PHOTO,
  async (payload, thunkAPI) => {
    const myId = thunkAPI.getState().users.myId;
    const pid = thunkAPI.getState().pComments.pid;
    const ids = {
      myId: myId,
      id: pid,
    };
    const { photos } = thunkAPI.getState().photos.allPhoto.photos;
    return await deletePhotos(photos, ids);
  }
);

export const selectPhoto = createAsyncThunk(
  SELECT_PHOTO,
  async (payload, thunkAPI) => {
    const myId = thunkAPI.getState().users.myId;
    if (myId) {
      const allPhoto = await getPhotoById(Number(myId));
      return allPhoto;
    }
  }
);

export const selectPhotoById = createAsyncThunk(
  SELECT_PHOTO_BY_ID,
  async (payload, thunkAPI) => {
    const pid = thunkAPI.getState().pComments.pid;
    if (pid) {
      const onePhoto = await getPhotoByPhotoId(Number(pid));
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
