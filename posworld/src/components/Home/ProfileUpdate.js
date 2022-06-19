import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input, InputGroup, InputGroupText, Modal } from "reactstrap";
import { IMG_PATH } from "../../http/CustomAxios";
import { deleteUser, loginCheck, logout, updateUser } from "../../store/users";
import "./ProfileUpdate.css";

const ProfileUpdate = ({ id, userid, prophoto, name, isOpen, modalClose }) => {
  const dispatch = useDispatch();
  const neviate = useNavigate();
  const [form, setForm] = useState({
    userid: userid,
    name: "",
    prophoto: prophoto,
    file: "",
  });

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
      reader.onload = () => {
        setForm({ ...form, prophoto: reader.result, file });
        resolve();
      };
    });
  };

  useEffect(() => {
    setForm({ userid, name, prophoto });
  }, [userid, name, prophoto]);

  const onChangeName = (e) => {
    const { value } = e.target;
    setForm({ ...form, name: value });
  };

  const onSubmit = async () => {
    await dispatch(updateUser(form));
    await dispatch(loginCheck());
    modalClose();
  };

  const withdrawal = async () => {
    const deleteResult = await dispatch(deleteUser(id));
    if (deleteResult.payload == 1) {
      alert("회원탈퇴에 성공했습니다.");
      await dispatch(logout());
      modalClose();
      neviate("/login");
    } else {
      alert("회원탈퇴에 실패했습니다.");
    }
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
        <Button color="danger" style={{ margin: "5px" }} onClick={withdrawal}>
          회원탈퇴
        </Button>
      </Modal>
    </div>
  );
};

const ProfileUpdateHeader = ({ modalClose, onSubmit }) => {
  return (
    <div className="profileUpdateHeaer">
      <Button id="cancelBtn" outline color="secondary" onClick={modalClose}>
        취소
      </Button>
      <b>프로필 수정</b>
      <Button id="updateBtn" outline color="primary" onClick={onSubmit}>
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
            src={`${form.prophoto}`}
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
