import axios from 'axios';
import { customAxios } from '../http/CustomAxios';
export const getHomeApi = async (id) => {

  try {
    const numberId = Number(id);
    const response = await customAxios(`home/${numberId}`, "get");
    return response;
  } catch (error) {
    throw error;
  }

};
export const updateHomeApi = async (home, id) => {
    try {
        const response = await customAxios(`/home/update/${id}`, 'put', home);
        return response;
    } catch (error) {
        throw error;
    }
};
