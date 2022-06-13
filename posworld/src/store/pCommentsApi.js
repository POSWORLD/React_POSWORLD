import axios from "axios";
import { customAxios } from "../http/CustomAxios";

export const insertComment = async (pComment) => {
  try {
    const response = await customAxios("pComment/", "post", pComment);
    return response;
  } catch (error) {
    throw error;
  }
};
