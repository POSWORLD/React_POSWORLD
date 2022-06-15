import { useState } from 'react';
import { GoDiffAdded } from 'react-icons/go';
import { useDispatch } from 'react-redux';
import { Button, Container, Input, Modal } from 'reactstrap';
import { insertBoards, selectMyBoard } from '../../store/boards';

const BoardWrite = () => {
   const dispatch = useDispatch();
   const [form, setForm] = useState({
      content: '',
      wDate: '20',
      userId: 1,
   });
   const [isOpen, setIsOpen] = useState(false);
   const closeModal = () => {
      setIsOpen(false);
   };
   const openModal = () => {
      setIsOpen(true);
   };

   const onChangeName = e => {
      const { value } = e.target;
      setForm({ ...form, content: value });
   };
   const onSubmit = async () => {
      await dispatch(insertBoards(form));
      await dispatch(selectMyBoard());
      closeModal();
   };

   const modeHandler = () => {
      const nowMode = null;
   };
   return (
      <div>
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
      </div>
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
