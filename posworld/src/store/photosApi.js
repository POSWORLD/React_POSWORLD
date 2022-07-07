import { customAxios } from "../http/CustomAxios";

export const postPhoto = async (photo, userid) => {
  try {
    const data = await customAxios(`photo/${userid}`, "post", photo);
    return data;
  } catch (error) {
    throw error;
  }
};

export const putPhoto = async (photo, photoinfo) => {
  try {
    const data = await customAxios(
      `photo/${photoinfo.id}/${photoinfo.myId}`,
      "put",
      photo
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const deletePhotos = async (photos, ids) => {
  try {
    const photoId = Number(ids.id);
    const response = await customAxios(
      `photo/${photoId}/${ids.myId}`,
      "delete"
    );
    if (response === true) {
      const delPhoto = await photos.filter((photo) => photo.id !== ids.id);
      return [...delPhoto];
    }
  } catch (error) {
    throw error;
  }
};

export const getPhotoById = async (id) => {
  try {
    const response = await customAxios(`photo-select/${id}`, "get");
    return response;
  } catch (error) {
    throw error;
  }
};

export const getPhotoByPhotoId = async (id) => {
  try {
    const response = await customAxios(`photo-select/detail/${id}`, "get");

    return response;
  } catch (error) {
    throw error;
  }
};
