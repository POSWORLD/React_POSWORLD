import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { deleteBoard } from '../../store/boards';
import { useLocation } from 'react-router-dom';

function BoardList() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const location = useLocation();
   const boardUpdate = () => {
      navigate('/boardUpdate');
   };
   const boardDelete = async boardNum => {
      await dispatch(deleteBoard(boardNum));
      await dispatch(location.pathname === '/board/');
   };

   return (
      <>
         <div className="BoardHeader">
            <div>num</div>
            <div>name</div>
         </div>
         <div className="FriendImg">방문자 이미지 넣기</div>
         <div>content</div>
         {}
         <Button onClick={boardUpdate}>수정</Button>
         <Button onClick={boardDelete}>삭제</Button>
      </>
   );
}
export default BoardList;
