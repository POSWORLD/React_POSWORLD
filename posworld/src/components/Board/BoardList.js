import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { deleteBoard, updateBoard } from '../../store/boards';
import { useLocation } from 'react-router-dom';
import changeTime from '../Pcomment/changeTime';
import AuthRouter from '../AuthRouter';
import './BoardList.css';
import BoardUpdate from './BoardUpdate';
import { IMG_PATH } from '../../http/CustomAxios';
function BoardList({ board, boardDelete, /* boardUpdate, */ index }) {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const location = useLocation();
   const [clickBoard, setClickBoard] = useState();
   const list = useSelector(state => state.boards.allBoard.boards);
   const myId = useSelector(state => state.users.me.id);
   // console.log(board);
   const [visible, setVisible] = useState(false);
   const moveTo = () => {
      setVisible(!visible);

      //navigate('/BoardUpdate', { state: board.num });
   };

   return (
      <>
         <div className="row4">
            <div className="comment">
               {board?.friendid === myId ? (
                  <>
                     <input type="button" className="btn" onClick={() => boardDelete(board?.num)} value="삭제" />
                     <input
                        type="button"
                        className="btn"
                        value="수정"
                        onClick={() => moveTo()}
                        /* onClick={() => BoardUpdate(board?.content , board?.num)} */
                     />
                     {visible && <BoardUpdate board={board} />}
                  </>
               ) : (
                  <div></div>
               )}
               <div className="date">
                  <span id="s1">No.{index + 1}</span> <span id="s2">{board?.friendname}</span>{' '}
                  <img id="home_img" src="img/logo.png"></img> <span id="s3">( {changeTime(board?.wdate)})</span>
               </div>
               <div className="main">
                  <img id="main_img1" src={`${IMG_PATH}${board?.friendimg}`} alt="프로필사진"></img>
                  <div className="main_text">{board?.content}</div>
                  {/* 이거 이미지에 넣기 <div className="FriendImg">{board?.friendImg}</div> */}
               </div>
            </div>
         </div>

         <AuthRouter></AuthRouter>
      </>
   );
}
export default BoardList;
