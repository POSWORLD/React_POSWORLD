import { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteBoard, insertBoards, selectBoards } from '../../store/boards';
import users, { idCheck } from '../../store/users';
import BoardWrite from './BoardWrite';
import BoardList from './BoardList';
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
   const [visible, setVisible] = useState(false);
   return (
      <>
         <Layout>
            <Sidebar>
               <Card>
                  <FlexWrapper>
                     <Profile></Profile>
                  </FlexWrapper>
               </Card>
            </Sidebar>
            <Contents>
               <Card>
                  <>
                     <span className="tap"></span>
                     <span className="boards">{myId.name} 님의 방명록</span>
                     <span>
                        <button
                           className="btn2"
                           onClick={() => {
                              setVisible(!visible);
                           }}>
                           {visible ? '취소' : '작성'}
                        </button>
                     </span>
                     {visible && <BoardWrite />}

                     {homeBoards.loading ? (
                        <Spinner>loading...</Spinner>
                     ) : (
                        homeBoards.boards
                           .slice(0)
                           .reverse()
                           .map((board, index) => (
                              <BoardList
                                 key={board.num}
                                 board={board}
                                 boardDelete={boardDelete}
                                 index={index}></BoardList>
                           ))
                     )}
                     <AuthRouter></AuthRouter>
                  </>
               </Card>
            </Contents>
         </Layout>
      </>
   );
};

export default Boards;
