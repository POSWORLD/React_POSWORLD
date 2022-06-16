import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux/es/exports';
import { Button, Modal, InputGroup, Input, InputGroupText } from 'reactstrap';
import { updateBoard } from '../../store/boards';

const BoardUpdate = (content, wdate, isOpen, modalClose) => {
   const [form, setForm] = useState({
      content,
      wdate,
   });
   const dispatch = useDispatch();
   const onChangeContent = e => {
      const { value } = e.target;
      setForm({ ...form, content: value });
   };
   const onSubmit = () => {
      dispatch(updateBoard(form));
      modalClose();
   };
   useEffect(() => {
      setForm({ content, wdate });
   }, [content, wdate]);
   return (
      <Modal fullscreen isOpen={isOpen}>
         <BoardUpdateHeader modalClose={modalClose} onSubmit={onSubmit}></BoardUpdateHeader>
         <BoardUpdateBody onChangeContent={onChangeContent} form={form}></BoardUpdateBody>
      </Modal>
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
