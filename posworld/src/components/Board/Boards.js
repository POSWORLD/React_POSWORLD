import { useState } from 'react';
import { Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { IMG_PATH } from '../../http/CustomAxios';
import { deleteBoard, selectMyBoard } from '../../store/boards';
import users from '../../store/users';
import BoardWrite from './BoardWrite';

function Boards() {
   // const homeBoard = useSelector((state)=>state.Boards.)
   const dispatch = useDispatch();
   const boardnew = async () => {};
   const [mode, setMode] = useState('read');
   const [contents, setContents] = useState([
      { title: '공지사항', content: '공지입니다.', id: '관리자', write_date: '2020. 7. 8. 오전 9:49:23', pw: '1' },
   ]);
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
   const onClickwrite = () => {};

   return (
      <div className="Boards">
         <h1>방명록</h1>
         <table>
            <tr>
               <div></div>
            </tr>
         </table>
         <p>
            <input type="button" value="작성하기" onClick={onClickwrite}></input>
         </p>

         <div className="Boards">
            <div className="PostsImgBox">
               <img className="PostsImg"></img>
            </div>
         </div>
      </div>
   );
}

export default Boards;
