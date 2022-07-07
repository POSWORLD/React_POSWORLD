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

export const deleteComment = async (comments, ids) => {
  try {
    console.log(ids);
    const commentid = Number(ids.id);
    console.log();
    const response = await customAxios(
      `pComment/${commentid}/${ids.myId}`,
      "delete"
    );
    if (response === 1) {
      const delComment = await comments.filter(
        (comment) => comment.id !== ids.id
      );
      return [...delComment];
    }
  } catch (error) {
    throw error;
  }
};
