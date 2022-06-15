import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customAxios } from "../http/CustomAxios";
import { deletePhotos, getPhotoById, postPhoto } from "./photosApi";

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
    console.log("하니?");
    const { photos } = thunkAPI.getState().photos.allPhoto.photos;
    console.log("photos" + photos);
    return await deletePhotos(photos, payload);
    /* const isDelete = await deletePhoto(payload); */
  }
);

export const selectPhoto = createAsyncThunk(
  SELECT_PHOTO,
  async (payload, thunkAPI) => {
    if (payload) {
      const allPhoto = await getPhotoById(Number(payload));
      return allPhoto;
    } else if (payload === undefined) {
      const allPhoto = await getPhotoById(1);
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
        const { newPhoto } = payload;
        return { ...state, myPhoto: newPhoto };
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
      });
  },
});

export default photosSlice.reducer;
