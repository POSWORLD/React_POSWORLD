import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Modal, InputGroup, Input, InputGroupText } from 'reactstrap';
import { insertBoards, selectBoards, updateBoard } from '../../store/boards';
import AuthRouter from '../AuthRouter';
import Layout from '../../styles/Layout/Layout';
import Sidebar from '../../styles/Layout/Sidebar';
import Profile from '../Home/Profile';
import Card from '../../styles/Layout/Card';
import Contents from '../../styles/Layout/Contents';
import styled from 'styled-components';
import './BoardList.css';
const FlexWrapper = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   height: 100%;
`;
const BoardUpdate = board => {
   const location = useLocation();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const myId = useSelector(state => state.users.me.id);
   const myBoard = useSelector(state => state.boards.allBoard.boards);
   const num = board.myNum;
   const [form, setForm] = useState({
      num,
      content: '',
      friendId: myId,
   });

   const onChangeContent = e => {
      const { value } = e.target;
      setForm({ ...form, content: value });
   };
   const onSubmit = async () => {
      await dispatch(updateBoard(form)).unwrap().then(alert('방명록이 수정되었습니다.'));
      //alert('방명록이 수정되었습니다.');
      //await dispatch(selectBoards());
      //navigate('/Board');
   };
   return (
      /*  <>
         <Layout>
            <Sidebar>
               <Card>
                  <FlexWrapper>
                     <Profile></Profile>
                  </FlexWrapper>
               </Card>
            </Sidebar>
            <Contents>
               <Card> */
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
                     onChange={e => onChangeContent(e)}
                     name="content"></textarea>
               </div>
               <form onSubmit={onSubmit}>
                  <button type="submit" className="submit-button">
                     저장
                  </button>
               </form>
            </div>
         </div>
         <AuthRouter></AuthRouter>
      </>
      /*       </Card>
            </Contents>
         </Layout>
      </> */
   );
};
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
