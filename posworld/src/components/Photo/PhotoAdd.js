import { useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Container } from "reactstrap";
function PhotoAdd() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    title: "",
    content: "",
    img: "/img/1.jpg",
    date: "",
  });

  return (
    <>
      <div></div>
      <Container>
        <div className="photoInsertForm">
          <Input type="text" placeholder="제목입력" id="title"></Input>
          <label htmlFor="imgUpload">
            <div className="profileImgBox">
              <img className="profileImg" src="" alt="myProfileImg"></img>
            </div>
          </label>
        </div>
      </Container>
    </>
  );
}

export default PhotoAdd;
