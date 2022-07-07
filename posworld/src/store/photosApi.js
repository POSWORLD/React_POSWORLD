import axios from 'axios';
import { customAxios } from '../http/CustomAxios';

export const postPhoto = async (photo, userid) => {
    try {
        console.log('photo', photo);
        // const data = await customAxios(`photo/${userid}`, 'post', photo);
        const data = await axios({
            url: `http://localhost:8000/photo/${userid}`,
            method: 'post',
            data: photo,
        });
        console.log('data', data);
        return data;
    } catch (error) {
        throw error;
    }
};

export const putPhoto = async (photo, photoinfo) => {
    try {
        console.log(photo);
        const data = await customAxios(`photo/${photoinfo.id}/${photoinfo.myId}`, 'put', photo);
        return data;
    } catch (error) {
        throw error;
    }
};

export const deletePhotos = async (photos, ids) => {
    try {
        const photoId = Number(ids.id);
        const response = await customAxios(`http://localhost:8000/photo/${photoId}/${ids.myId}`, 'delete');
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
        const response = await customAxios(`photo/${id}`, 'get');
        return response;
    } catch (error) {
        throw error;
    }
};

export const getPhotoByPhotoId = async (id) => {
    try {
        const response = await customAxios(`photo/detail/${id}`, 'get');

        return response;
    } catch (error) {
        throw error;
    }
};
