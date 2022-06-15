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
