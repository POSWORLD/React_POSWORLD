import axios from "axios";
import { customAxios } from "../http/CustomAxios";
export const getHomeApi = async (id) => {
  try {
    const numberId = Number(id);
    const response = await customAxios(`home/${numberId}`, "get");
    console.log("response", response);
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateHomeApi = async (home, id) => {
  try {
    const response = await customAxios(`/home/${id}`, "put", home);
    return response;
  } catch (error) {
    throw error;
  }
};
