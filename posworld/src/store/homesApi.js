import axios from 'axios';

export const getHomeApi = async (id) => {
    try {
        const numberId = Number(id);
        const response = await axios({
            url: `/home/${numberId}`,
            method: 'get',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        console.log('response', response);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const updateHomeApi = async (home, id) => {
    try {
        const response = await axios({
            url: `/home/update/${id}`,
            method: 'put',
            data: home,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fileupload = async (file) => {
    try {
        const response = await axios({
            url: `http://localhost:9002/upload`,
            method: 'post',
            data: file,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error.response.data);
    }
};
