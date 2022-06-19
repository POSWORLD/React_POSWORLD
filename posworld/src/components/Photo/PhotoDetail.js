import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import styled from "styled-components";
import { IMG_PATH } from "../../http/CustomAxios";
import { deletePhoto, selectPhoto, selectPhotoById } from "../../store/photos";
import Card from "../../styles/Layout/Card";
import Contents from "../../styles/Layout/Contents";
import FlexWrapper from "../../styles/Layout/FlexWrapper";
import Layout from "../../styles/Layout/Layout";
import Sidebar from "../../styles/Layout/Sidebar";
import AuthRouter from "../AuthRouter";
import Profile from "../Home/Profile";
import Pcomment from "../Pcomment/Pcomment";
import changeTime from "../Pcomment/changeTime";

const PhotoSection = styled.section`
  height: fit-content !important;
  justify-content: space-between;
  height: 100%;
  img {
    margin: 0.5rem;
    text-align: center;
  }
  Button {
    border: 1px solid black;
    color: black;
    background: white;
  }
  .photoContent {
    text-align: center;
  }

  .contents {
    width: 100%;
    height: auto;
    text-align: center;
  }

  #listBtn {
    float: left;
    margin-bottom: 30px;
    margin-right: 0.5rem;
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

const Title = styled.div`
  margin-top: 1rem;
  height: auto;
  width: 100%;
  padding: 1px;
  font-size: 1.4rem;
  background: ${(props) => props.color || "#F0F0F0"};
  text-align: center;
  font-weight: bold;
`;

const PcommentSection = styled.section`
  height: auto;
  margin-top: 50px;
`;

function PhotoDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pid = useSelector((state) => state.pComments.pid);

  const photo = useSelector((state) => state.photos.photos);

  const moveTo = () => {
    navigate("/PhotoUpdate");
  };

  const linkTo = () => {
    navigate("/Photo");
  };

  const onClickDelete = async (id) => {
    await dispatch(deletePhoto(id));
    await dispatch(selectPhoto());
  };

  const photoDispatch = async (pid) => {
    await dispatch(selectPhotoById(pid));
  };

  useEffect(() => {
    photoDispatch(pid);
  }, []);

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
            <PhotoSection>
              <Title>{photo.title} </Title>
              <p id="editDate">{changeTime(photo.wdate)}</p>
              <div className="photoContent">
                <p>
                  <img src={`${IMG_PATH}${photo?.img}`} alt="이미지"></img>
                </p>
                <div className="contents">{photo.content}</div>
              </div>
              <p>
                <Button id="listBtn" onClick={linkTo}>
                  목록
                </Button>

                <Button id="editBtn" onClick={moveTo}>
                  수정
                </Button>
                <Button id="removeBtn" onClick={() => onClickDelete()}>
                  삭제
                </Button>
              </p>
            </PhotoSection>
            <PcommentSection>
              <Pcomment></Pcomment>
            </PcommentSection>
          </Card>
        </Contents>
      </Layout>
      <AuthRouter></AuthRouter>
    </>
  );
}
export default PhotoDetail;
