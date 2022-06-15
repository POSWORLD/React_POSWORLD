import { customAxios } from '../http/CustomAxios';

export const deleteBoardByNum = async (boards, num) => {
   const delBoards = await boards.filter(board => board.num !== num);
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

export const getBoardByHomeId = async homeId => {
   try {
      const response = await customAxios(`/board/${homeId}`, 'get');
      console.log(response);
      return response;
   } catch (error) {
      throw error;
   }
};
