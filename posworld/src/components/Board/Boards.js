import { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { IMG_PATH } from '../../http/CustomAxios';
import { deleteBoard, selectBoards, selectMyBoard } from '../../store/boards';
import users from '../../store/users';
import BoardWrite from './BoardWrite';
import BoardList from './BoardList';
import AuthRouter from '../AuthRouter';

const Boards = ({ boardState, boards }) => {
   const homeBoards = useSelector(state => state.boards.allBoard);
   const myId = useSelector(state => state.users.me);
   const boardPatch = async () => {
      await dispatch(selectBoards());
   };
   useEffect(() => {
      boardPatch();
   }, []);

   const dispatch = useDispatch();
   const [mode, setMode] = useState('read');

   const boardDelete = async boardNum => {
      await dispatch(deleteBoard(boardNum));
      await dispatch(selectBoards());
   };

   // const boardUpdate = () => {
   //    navigate('/boardUpdate');
   // };

   const modeHandler = async e => {
      e.preventDefault();
      const nowMode = null;

      if (mode === 'read') {
         setMode('write');
         nowMode = <Boards></Boards>;
      } else {
         setMode('read');
         nowMode = <BoardWrite></BoardWrite>;
      }
      return nowMode;
   };
   return (
      <>
         <div className="Boards">
            <h1>{myId.name} 님의 방명록</h1>
            <BoardWrite></BoardWrite>
            {homeBoards.loading ? (
               <Spinner>loading...</Spinner>
            ) : (
               homeBoards.boards.map(board => (
                  <BoardList key={board.num} board={board} boardDelete={boardDelete}></BoardList>
               ))
            )}
         </div>
         <AuthRouter></AuthRouter>
      </>
   );
};

export default Boards;
