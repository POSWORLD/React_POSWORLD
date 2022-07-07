import Boards from '../components/Board/Boards';
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
      const response = await customAxios(`/board/${board.num}`, 'put', board);
      return response;
   } catch (error) {
      throw error;
   }
};

export const insertBoard = async (board, myId) => {
   try {
      const response = await customAxios(`/board/${board.homeId}/${myId}`, 'post', board);

      return response;
   } catch (error) {
      throw error;
   }
};

export const getBoardByHomeId = async homeId => {
   try {
      const response = await customAxios(`/board/${homeId}`, 'get');
      return response;
   } catch (error) {
      throw error;
   }
};
