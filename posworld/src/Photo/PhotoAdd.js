import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Container, Input, Label } from "reactstrap";
import "./PhotoAdd.css";
function PhotoAdd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    content: "",
    img: "/img/1.jpeg",
    file: "",
  });

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve) => {
      reader.onload = () => {
        setForm({ ...form, img: reader.result, file });
        resolve();
      };
    });
  };

  const moveHome = () => {
    navigate("/Home");
  };

  const onSubmit = async () => {};
  return (
    <>
      <Container>
        <div className="photoAddForm">
          <Input type="text" id="photoTitle" placeholder="제목입력"></Input>
          <div>
            <Label htmlFor="photoUpload">이미지</Label>
            <Input
              type="file"
              accept="image/*"
              id="photoUpload"
              label="첨부"
              onChange={(e) => onChangeFile(e)}
            ></Input>
          </div>
          <Input type="textarea"></Input>
          <Button type="button" onClick={() => moveHome()}>
            목록
          </Button>
          <Button type="button" onClick={onSubmit}>
            확인
          </Button>
        </div>
      </Container>
    </>
  );
}

export default PhotoAdd;
