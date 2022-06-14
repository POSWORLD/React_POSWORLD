import { customAxios } from "../http/CustomAxios";

export const insertComment = async (pComment) => {
  try {
    const response = await customAxios("pComment/", "post", pComment);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCommentByPid = async (pid) => {
  try {
    const response = await customAxios(`pComment/${pid}`, "get");
    return response;
  } catch (error) {
    throw error;
  }
};
