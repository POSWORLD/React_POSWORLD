import { getValue } from '@testing-library/user-event/dist/utils';
import { Axios } from 'axios';
import { useEffect, useState } from 'react';
import { GoDiffAdded } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Input, Modal } from 'reactstrap';
import { insertBoards, selectBoards } from '../../store/boards';
import { getMyBoards } from '../../store/boardsApi';
import AuthRouter from '../AuthRouter';

const BoardWrite = () => {
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
      await dispatch(selectBoards());
      setIsOpen(false);
   };

   return (
      <>
         <Button outline onClick={openModal}>
            <GoDiffAdded size={30}></GoDiffAdded>
         </Button>

         <Modal isOpen={isOpen} fullscreen toggle={closeModal}>
            <div className="board-write">
               <h2> 방명록 작성</h2>
               <div className="boardContainer">
                  <h3>
                     <label>
                        <p>{myId.name}</p>의 방명록
                     </label>
                  </h3>
                  <div>내용</div>
                  {viewContent.map(element => (
                     <div>{element.content}</div>
                  ))}
               </div>
               <div className="board-wrapper">
                  <input
                     className="text-area"
                     type="text"
                     placeholder="남기고 싶은 말을 작성해주세요"
                     onChange={getValue}
                     name="content"></input>
               </div>
               <button className="submit-button" onClick={submitBoard}>
                  저장
               </button>
            </div>
         </Modal>
         <AuthRouter></AuthRouter>
      </>
      /*  <div>
         <form
            onSubmit={function (e) {
               e.preventDefault();
               const date = new Date();
               const wDate = date.toLocaleString();
               const g_data = {
                  content: e.target.content.value,
                  id: e.target.id.value,
                  write_date: wDate,
               };
               if (g_data.content === '') {
                  alert('내용을 입력해주세요!');
               } else {
                  this.props.onSubmit(g_data);
                  alert('등록되었습니다.');
               }
            }.bind(this)}>
            <p>박정인</p>
            <p>
               <textarea
                  style={{ width: '450px', height: '150px' }}
                  name="content"
                  placeholder="내용을 입력하세요"></textarea>
            </p>
            <p>
               <input type="submit" value="등록"></input>
            </p>
         </form>
      </div> */

      //   <>
      //      <Button outline onClick={openModal}>
      //         <GoDiffAdded size={30}></GoDiffAdded>
      //      </Button>

      //      <Modal isOpen={isOpen} fullscreen toggle={closeModal}>
      //         <div className="PostsModalHeader">
      //            <Button close onClick={closeModal}></Button>{' '}
      //            <div>
      //               <strong>게시물 생성</strong>
      //            </div>
      //            <Button
      //               color="info" //
      //               outline
      //               onClick={onSubmit}>
      //               글쓰기
      //            </Button>
      //         </div>
      //         <Container>
      //            <div className="profileUpdateForm">
      //               <Input
      //                  type="file"
      //                  hidden //
      //                  accept="image/*"
      //                  id="imgUpload"
      //                  onChange={e => onChangeFile(e)}></Input>
      //               <label htmlFor="imgUpload">
      //                  <div className="profileImgBox">
      //                     <img className="profileImg" src={form.img} alt="myProfileImg"></img>
      //                  </div>
      //               </label>

      //               <Input type="textarea" value={form.name} onChange={e => onChangeName(e)}></Input>
      //            </div>
      //         </Container>
      //      </Modal>
      //   </>
   );
};

export default BoardWrite;
