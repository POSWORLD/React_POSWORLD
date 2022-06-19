import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input, InputGroup, InputGroupText, Modal } from "reactstrap";
import { getHome, updateHome } from "../../store/homes";
import { loginCheck } from "../../store/users";
import "./ProfileUpdate.css";

const HomeUpdate = ({ title, photo, content, isOpen, modalClose }) => {
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const myId = useSelector((state) => state.users.me.myId);
  const [form, setForm] = useState({
    title: "",
    photo: "",
    content: "",
    file: "",
  });

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
      reader.onload = () => {
        setForm({ ...form, photo: reader.result, file });
        resolve();
      };
    });
  };

  useEffect(() => {
    setForm({ title, photo, content });
  }, [title, photo, content]);

  const onChangeTitle = (e) => {
    const { value } = e.target;
    setForm({ ...form, title: value });
  };
  const onChangeContent = (e) => {
    const { value } = e.target;
    setForm({ ...form, content: value });
  };
  const onSubmit = () => {
    dispatch(loginCheck())
      .unwrap()
      .then(() => {
        dispatch(updateHome(form));
        dispatch(getHome(myId));
      });
    modalClose();
  };

  return (
    <div className="profileUpdatePage">
      <Modal isOpen={isOpen}>
        <HomeUpdateHeader
          modalClose={modalClose}
          onSubmit={onSubmit}
        ></HomeUpdateHeader>

        <HomeUpdateBody
          onChangeTitle={onChangeTitle}
          onChangeContent={onChangeContent}
          onChangeFile={onChangeFile}
          form={form}
        ></HomeUpdateBody>
      </Modal>
    </div>
  );
};

const HomeUpdateHeader = ({ modalClose, onSubmit }) => {
  return (
    <div className="profileUpdateHeaer">
      <Button outline color="secondary" onClick={modalClose}>
        취소
      </Button>
      <b>홈피 수정</b>
      <Button outline color="primary" onClick={onSubmit}>
        수정
      </Button>
    </div>
  );
};

const HomeUpdateBody = ({
  onChangeTitle,
  onChangeFile,
  onChangeContent,
  form,
}) => {
  return (
    <div className="profileUpdateForm">
      <Input
        type="file"
        hidden
        accept="image/*"
        id="imgUpload"
        onChange={(e) => onChangeFile(e)}
      ></Input>
      <label htmlFor="imgUpload">
        <div className="profileImgBox">
          <img
            className="profileImg"
            src={`${form.photo}`}
            alt="myProfileImg"
            onError={(e) => {
              e.target.src = "/img/uploadImg.png";
            }}
          ></img>
        </div>
      </label>

      <InputGroup>
        <InputGroupText>홈피 제목</InputGroupText>
        <Input
          type="text"
          value={form.title}
          onChange={(e) => onChangeTitle(e)}
        ></Input>
        <InputGroupText>한 줄 감성</InputGroupText>
        <Input
          type="text"
          value={form.content}
          onChange={(e) => onChangeContent(e)}
        ></Input>
      </InputGroup>
    </div>
  );
};

export default HomeUpdate;
