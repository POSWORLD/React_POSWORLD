import { customAxios } from "../http/CustomAxios";

export const postPhoto = async (photos, photo) => {
  try {
    const newPhoto = { ...photo, id: photo.length };
    return [...photo, newPhoto];
  } catch (error) {
    throw error;
  }
  /*  try {
        const { data } = await customAxios('post', '/photo', photo);
        return data;
    } catch (error) {
        throw error;
    } */
};

export const putPhoto = async (photos, photo, id) => {
  try {
    const findPostIndex = await photo.findIndex((post) => photo.id === id);
    const { content, img } = photo;
    if (findPostIndex === -1) {
      return new Error("index not found");
    }
    const newPhotos = [...photos];
    newPhotos.slice(findPostIndex, 1, {
      ...photos[findPostIndex],
      content,
      img,
    });
    return newPhotos;
  } catch (error) {
    throw error;
  }
  /* try {
        const { data } = await customAxios('put', `/photo/${id}`, photo);
        return data;
    } catch (error) {
        throw error;
    } */
};

export const deletePhoto = async (photos, id) => {
  const delPhoto = await photos.filter((photo) => photo.id !== id);
  console.log(delPhoto);
  return [...delPhoto];
  /* const { data } = await customAxios('delete', `/post/${id}`);
    return data; */
};

export const getPhotoById = async (id) => {
  try {
    const response = await customAxios(`photo/${id}`, "get");
    return response;
  } catch (error) {
    throw error;
  }
};
