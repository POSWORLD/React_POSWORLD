import { getValue } from '@testing-library/user-event/dist/utils';
import { Axios } from 'axios';
import { useEffect, useState } from 'react';
import { GoDiffAdded } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Container, Input, Modal } from 'reactstrap';
import { insertBoards, selectBoards } from '../../store/boards';
import { getMyBoards } from '../../store/boardsApi';
import AuthRouter from '../AuthRouter';
import { setHomeId } from '../../store/homes';
import './BoardList.css';
import { IMG_PATH } from '../../http/CustomAxios';
const BoardWrite = friend => {
   const navigate = useNavigate();
   const location = useLocation();
   const userId = location.state;
   console.log('유저아이디', friend);
   const [form, setForm] = useState({
      content: '',
      userId: userId,
   });
   const [viewContent, setViewContent] = useState([]);
   const [isOpen, setIsOpen] = useState(false);
   const dispatch = useDispatch();

   const closeModal = () => {
      setIsOpen(false);
   };
   const openModal = () => {
      setIsOpen(true);
   };
   const getValue = e => {
      const { name, value } = e.target;
      setForm({
         ...form,
         [name]: value,
      });
   };

   const submitBoard = async () => {
      await dispatch(insertBoards(form));
      alert('등록완료');
   };

   return (
      <>
         <div className="row4">
            <div className="comment">
               {viewContent.map(element => (
                  <div>{element.content}</div>
               ))}
               <div className="main">
                  <img id="main_img1" src={`${IMG_PATH}${friend?.friend.prophoto}`} alt="작성자사진"></img>

                  <textarea
                     className="text-area"
                     type="text"
                     placeholder="남기고 싶은 말을 작성해주세요"
                     onChange={getValue}
                     name="content"></textarea>
               </div>
               <form onSubmit={submitBoard}>
                  <button type="submit" className="submit-button">
                     저장
                  </button>
               </form>
            </div>
         </div>
         <AuthRouter></AuthRouter>
      </>
   );
};

export default BoardWrite;
