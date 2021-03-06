import { Button } from "reactstrap";
import Card from "../../styles/Layout/Card";
import Layout from "../../styles/Layout/Layout";
import Sidebar from "../../styles/Layout/Sidebar";
import FlexWrapper from "../../styles/Layout/FlexWrapper";
import Profile from "../Home/Profile";
import Contents from "../../styles/Layout/Contents";
import { useDispatch, useSelector } from "react-redux";
import { selectPhoto, selectPhotoById } from "../../store/photos";
import { useEffect } from "react";
import AuthRouter from "../AuthRouter";
import { useNavigate } from "react-router-dom";
import { IMG_PATH } from "../../http/CustomAxios";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";
import { setPids } from "../../store/pComments";

const Photolist = styled.h5`
  color: #238db3;
  font-weight: bold;
`;
const Photos = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  .PhotoImgBox {
    cursor: pointer;
    text-align: center;
  }

  .PhotoImg {
    width: 80%;
    height: 30%;
    aspect-ratio: 1;
    margin: 2px;
    border: 1px solid black;
    text-align: center;
    object-fit: cover;
  }

  .PhotoTitle {
    text-align: center;
    border: 1px solid black;
    margin: 4px;
  }
`;

function Photo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector((state) => state.users.me);
  const myPhoto = useSelector((state) => state.photos.allPhoto);

  const photoDispatch = async () => {
    await dispatch(selectPhoto());
  };

  const openDetail = (photo) => {
    dispatch(setPids(photo.id))
      .unwrap()
      .then(() => {
        dispatch(selectPhotoById(photo.id))
          .unwrap()
          .then(() => {
            navigate("/PhotoDetail");
          });
      });
  };

  useEffect(() => {
    photoDispatch();
  }, []);

  const moveTo = () => {
    return navigate("/PhotoAdd", { state: id });
  };
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
            <Photolist>????????????</Photolist>
            <Button onClick={moveTo}>????????????</Button>
            <Photos>
              {myPhoto.loading ? (
                <Spinner>loading...</Spinner>
              ) : (
                myPhoto.photos.map((photo) => (
                  <div
                    className="PhotoImgBox"
                    onClick={() => openDetail(photo)}
                  >
                    <img
                      className="PhotoImg"
                      key={photo.id}
                      src={`${IMG_PATH}${photo.img}`}
                      alt={photo.content}
                    ></img>
                    <p className="PhotoTitle">{photo.title}</p>
                  </div>
                ))
              )}
            </Photos>
          </Card>
        </Contents>
      </Layout>
      <AuthRouter></AuthRouter>
    </>
  );
}
export default Photo;
