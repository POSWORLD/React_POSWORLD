import { getValue } from '@testing-library/user-event/dist/utils';
import { Axios } from 'axios';
import { useEffect, useState } from 'react';
import { GoDiffAdded } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Input, Modal } from 'reactstrap';
import { insertBoards, selectBoards } from '../../store/boards';
import { getMyBoards } from '../../store/boardsApi';
import AuthRouter from '../AuthRouter';
import './BoardList.css';
const BoardWrite = () => {
   const navigate = useNavigate();
   const [content, setContent] = useState('');
   const [viewContent, setViewContent] = useState([]);
   const [isOpen, setIsOpen] = useState(false);
   const myId = useSelector(state => state.users.me);
   const dispatch = useDispatch();
   const closeModal = () => {
      setIsOpen(false);
   };
   const openModal = () => {
      setIsOpen(true);
   };
   const getValue = e => {
      const { name, value } = e.target;
      setContent({
         ...content,
         [name]: value,
      });
      // console.log(name, value);
   };

   const submitBoard = async () => {
      await dispatch(insertBoards(content));
      alert('등록완료');
      // await dispatch(selectBoards());
   };

   return (
      <>
         <div className="row4">
            <div className="comment">
               {viewContent.map(element => (
                  <div>{element.content}</div>
               ))}
               <div className="main">
                  <img id="main_img1" src="img/kim.png" alt="배경2사진"></img>

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
