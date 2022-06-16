import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Modal, InputGroup, Input, InputGroupText } from 'reactstrap';
import { insertBoards, updateBoard } from '../../store/boards';
import AuthRouter from '../AuthRouter';

function BoardUpdate() {
   const location = useLocation();
   const myId = useSelector(state => state.users.me);
   const [form, setForm] = useState({
      content: '',
      num: location.state,
      friendId: myId.id,
   });
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const onChangeContent = e => {
      const { value } = e.target;
      setForm({ ...form, content: value });
   };
   const onSubmit = () => {
      dispatch(updateBoard(form));
   };

   return (
      <>
         <div className="row4">
            <div className="comment">
               {/* {viewContent.map(element => (
                  <div>{element.content}</div>
               ))} */}
               <div className="main">
                  <img id="main_img1" src="img/kim.png" alt="배경2사진"></img>

                  <textarea
                     className="text-area"
                     type="text"
                     placeholder="남기고 싶은 말을 작성해주세요"
                     onChange={onChangeContent}
                     name="content"></textarea>
               </div>
               <button type="submit" className="submit-button" onClick={onSubmit}>
                  저장
               </button>
            </div>
         </div>
         <AuthRouter></AuthRouter>
      </>
      // <Modal fullscreen isOpen={isOpen}>
      //    <BoardUpdateHeader modalClose={modalClose} onSubmit={onSubmit}></BoardUpdateHeader>
      //    <BoardUpdateBody onChangeContent={onChangeContent} form={form}></BoardUpdateBody>
      // </Modal>
   );
}
export default BoardUpdate;

const BoardUpdateHeader = ({ modalClose, onSubmit }) => {
   return (
      <div className="boardUpdateHeader">
         <Button onClick={modalClose}>취소</Button>
         <b>방명록 수정</b>
         <Button onClick={onSubmit}>수정 </Button>
      </div>
   );
};

const BoardUpdateBody = ({ onChangeContent, form }) => {
   return (
      <div className="boardUpdateForm">
         <InputGroup>
            <InputGroupText>내용</InputGroupText>
            <Input type="text" value={form.content} onChange={e => onChangeContent(e)}></Input>
         </InputGroup>
      </div>
   );
};
