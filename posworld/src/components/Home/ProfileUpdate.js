import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Input, InputGroup, InputGroupText, Modal } from "reactstrap";
import { IMG_PATH } from "../../http/CustomAxios";
import { loginCheck, updateUser } from "../../store/users";
import "./ProfileUpdate.css";

const ProfileUpdate = ({ proPhoto, name, isOpen, modalClose }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    proPhoto: "",
    file: "",
  });

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
      reader.onload = () => {
        setForm({ ...form, proPhoto: reader.result, file });
        resolve();
      };
    });
  };

  useEffect(() => {
    setForm({ name, proPhoto });
  }, [name, proPhoto]);

  const onChangeName = (e) => {
    const { value } = e.target;
    setForm({ ...form, name: value });
  };

  const onSubmit = async () => {
    await dispatch(updateUser(form));
    await dispatch(loginCheck());
    modalClose();
  };

  return (
    <div className="profileUpdatePage">
      <Modal isOpen={isOpen}>
        <ProfileUpdateHeader
          modalClose={modalClose}
          onSubmit={onSubmit}
        ></ProfileUpdateHeader>
        <ProfileUpdateBody
          onChangeName={onChangeName}
          onChangeFile={onChangeFile}
          form={form}
        ></ProfileUpdateBody>
      </Modal>
    </div>
  );
};

const ProfileUpdateHeader = ({ modalClose, onSubmit }) => {
  return (
    <div className="profileUpdateHeaer">
      <Button outline color="secondary" onClick={modalClose}>
        취소
      </Button>
      <b>프로필 수정</b>
      <Button outline color="primary" onClick={onSubmit}>
        수정
      </Button>
    </div>
  );
};

const ProfileUpdateBody = ({ onChangeFile, onChangeName, form }) => {
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
            src={`${form.proPhoto}`}
            alt="myProfileImg"
            onError={(e) => {
              e.target.src = "/img/uploadImg.png";
            }}
          ></img>
        </div>
      </label>

      <InputGroup>
        <InputGroupText>이름</InputGroupText>
        <Input
          type="text"
          value={form.name}
          onChange={(e) => onChangeName(e)}
        ></Input>
      </InputGroup>
    </div>
  );
};

export default ProfileUpdate;
