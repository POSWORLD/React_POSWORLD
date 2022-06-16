import { customAxios } from '../http/CustomAxios';

export const deleteBoardByNum = async (boards, num) => {
   try {
      const boardnum = Number(num);
      const response = await customAxios(`/board/${boardnum}`, 'delete');
      if (response == true) {
         const delBoards = await boards.filter(board => board.num !== num);
         return [...delBoards];
      }
   } catch (error) {
      throw error;
   }
};
export const putBoards = async board => {
   try {
      const boardnum = Number(board.num);
      const response = await customAxios(`/board/${boardnum}`, 'put', board);
      console.log(board);
      if (response == true) {
         const updateBoards = await board.filter(board => board.num !== boardnum);
         return [...updateBoards];
      }
      console.log(response);
      return response;
   } catch (error) {
      throw error;
   }
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
      //console.log(response);
      return response;
   } catch (error) {
      throw error;
   }
};
