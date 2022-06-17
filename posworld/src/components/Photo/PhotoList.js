import { Button, Spinner } from "reactstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import changeTime from "../Pcomment/changeTime";
import { IMG_PATH } from "../../http/CustomAxios";
import PcommentAdd from "../Pcomment/PcommentAdd";
import Pcomment from "../Pcomment/Pcomment";
import { useDispatch, useSelector } from "react-redux";
import { deleteComments, selectComments } from "../../store/pComments";
import AuthRouter from "../AuthRouter";
import { useEffect } from "react";

const Title = styled.div`
  margin-top: 1rem;
  height: auto;
  width: 100%;
  padding: 1px;
  background: ${(props) => props.color || "#F0F0F0"};
  text-align: center;
  font-weight: bold;
`;

const PhotoSection = styled.section`
  height: fit-content !important;
  justify-content: space-between;
  height: 100%;
  img {
    margin: 0.5rem;
  }
  Button {
    border: 1px solid black;
    color: black;
    background: white;
  }
  .contents {
    width: 100%;
    height: auto;
  }

  #editBtn {
    float: left;
    margin-bottom: 30px;
  }

  #removeBtn {
    float: right;
    margin-bottom: 30px;
  }
`;
const PcommentSection = styled.section`
  height: auto;
  margin-top: 40px;
`;

function PhotoList({ photo, onClickDelete, onSubmit }) {
  const comment = useSelector((state) => state.pComments.comments);
  const dispatch = useDispatch();
  const commentPatch = async (pid) => {
    await dispatch(selectComments(pid));
  };
  const commentsDelete = async (ids) => {
    await dispatch(deleteComments(ids));
    await dispatch(selectComments(ids.pid));
  };
  console.log("pid", comment);
  useEffect(() => {
    commentPatch(photo.id);
  }, []);

  const navigate = useNavigate();
  const moveTo = () => {
    navigate("/PhotoUpdate");
  };
  return (
    <>
      <PhotoSection>
        <Title>{photo?.title} </Title>
        <p id="editDate">{changeTime(photo?.wdate)}</p>
        <p>
          <img src={`${IMG_PATH}${photo?.img}`} alt="이미지"></img>
        </p>
        <div className="contents"> {photo?.content}</div>
        <p>
          <Button id="editBtn" onClick={moveTo}>
            수정
          </Button>
          <Button id="removeBtn" onClick={() => onClickDelete(photo?.id)}>
            삭제
          </Button>
        </p>
      </PhotoSection>
      <PcommentSection>
        {comment.map((index) => (
          <>
            <Pcomment pid={photo.id} comment={index}></Pcomment>
          </>
        ))}
      </PcommentSection>
    </>
  );
}

export default PhotoList;
