import { customAxios } from '../http/CustomAxios';

export const deleteBoardById = async (boards, id) => {
   const delBoards = await boards.filter(board => board.id !== id);
   return [...delBoards];
};

export const insertBoard = async board => {
   try {
      const response = await customAxios('/board/', 'post', board);
      // const newPost = { ...post, id: posts.length };
      // return [...posts, newPost];
      return response;
   } catch (error) {
      throw error;
   }
};

export const getMyBoards = async (boards, userId) => {
   try {
      return await customAxios('/board/my', 'get');
   } catch (error) {
      throw error;
   }
};
