import axios from "axios";
import { customAxios } from "../http/CustomAxios";
export const getHomeApi = async (id) => {
  const response = await axios({
    url: `http://localhost:8001/home/${id}`,
    method: "get",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};
export const updateHomeApi = async (home, id) => {
  try {
    const response = await customAxios(`/home/${id}`, "put", home);
    return response;
  } catch (error) {
    throw error;
  }
};
