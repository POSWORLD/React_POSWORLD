import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8001';
export const IMG_PATH = 'http://localhost:8001';
export const customAxios = async (url, method, data) => {
    try {
        const response = await axios({
            url,
            method,
            data,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error.response.data);
    }
};
export const fileAxios = async (url, method, data) => {
    const response = await axios({
        url,
        method,
        data,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};
