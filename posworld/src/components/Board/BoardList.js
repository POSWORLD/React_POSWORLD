import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { deleteBoard } from '../../store/boards';
import { useLocation } from 'react-router-dom';
import changeTime from '../Pcomment/changeTime';
import AuthRouter from '../AuthRouter';

function BoardList({ board, boardDelete }) {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const location = useLocation();
   const [clickBoard, setClickBoard] = useState();
   const list = useSelector(state => state.boards.allBoard.boards);
   const myId = useSelector(state => state.users.me.id);
   //console.log(list);

   // console.log(myId);
   const boardUpdate = () => {
      navigate('/boardUpdate');
   };

   return (
      <>
         <div className="BoardHeader">
            <div>num</div>
            <div>작성자 : {board?.friendName}</div>
            <div>작성일 :{changeTime(board?.wdate)}</div>
         </div>
         <div className="FriendImg">{board?.friendImg}</div>
         <div>내용 : {board?.content}</div>
         {board?.friendId === myId ? (
            <>
               <Button onClick={boardUpdate}>수정</Button>
               <Button onClick={() => boardDelete(board?.num)}>삭제</Button>
            </>
         ) : (
            <div></div>
         )}

         <AuthRouter></AuthRouter>
      </>
   );
}
export default BoardList;
