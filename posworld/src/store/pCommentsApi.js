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

export const deleteComment = async (comments, id) => {
  try {
    console.log("여기눈");
    console.log("comments" + comments);
    const commnetid = Number(id);
    const response = await customAxios(`pComment/${commnetid}`, "delete");
    console.log(response);
    if (response === true) {
      const delComment = await comments.filter((comment) => comment.id !== id);
      return [...delComment];
    }
  } catch (error) {
    throw error;
  }
};
