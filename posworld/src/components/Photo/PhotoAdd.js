import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Input, Container, Button } from "reactstrap";
import { insertPhoto } from "../../store/photos";
import "./PhotoAdd.css";

function PhotoAdd() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    title: "",
    content: "",
    img: "/img/image1.jpg",
    file: "",
  });

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
      reader.onoad = () => {
        setForm({ ...form, img: reader.result, file });
        resolve();
      };
    });
  };

  const onSubmit = async () => {
    await dispatch(insertPhoto(form));
  };

  return (
    <>
      <div></div>
      <Container>
        <hr style={{ height: 2 }} />
        <div className="photoInsertForm">
          <Input type="text" placeholder="제목입력" id="title"></Input>
          <div className="profileImgBox">
            <label htmlFor="imgUpload">이미지</label>
            {/* <img className="profileImg" src="" alt="photoImg"></img> */}
            <Input
              type="file"
              id="img"
              onChange={(e) => onChangeFile(e)}
            ></Input>
          </div>
          <br></br>
          <div>
            <textarea id="content"></textarea>
          </div>
        </div>
        <div>
          <Link to="">
            <Button id="listBtn">목록</Button>
          </Link>
          <Button type="submit" onClick={onSubmit} id="submitBtn">
            확인
          </Button>
        </div>
      </Container>
    </>
  );
}

export default PhotoAdd;
