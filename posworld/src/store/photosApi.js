import { customAxios } from '../http/CustomAxios';

export const postPhoto = async (photo) => {
    try {
        const data = await customAxios('photo/', 'post', photo);
        return data;
    } catch (error) {
        throw error;
    }
};

export const putPhoto = async (photo, id) => {
    try {
        const data = await customAxios(`photo/${photo.id}`, 'put', photo);
        return data;
    } catch (error) {
        throw error;
    }
};

export const deletePhotos = async (photos, id) => {
    try {
        const photoId = Number(id);
        const response = await customAxios(`photo/${photoId}`, 'delete');
        if (response === true) {
            const delPhoto = await photos.filter((photo) => photo.id != id);
            return [...delPhoto];
        }
    } catch (error) {
        throw error;
    }
};

export const getPhotoById = async (id) => {
    try {
        const response = await customAxios(`photo/${id}`, 'get');
        return response;
    } catch (error) {
        throw error;
    }
};
