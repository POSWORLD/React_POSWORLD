import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "reactstrap";
import Card from "../../styles/Layout/Card";
import Layout from "../../styles/Layout/Layout";
import Sidebar from "../../styles/Layout/Sidebar";
import FlexWrapper from "../../styles/Layout/FlexWrapper";
import PhotoList from "./PhotoList";
import Profile from "../Home/Profile";
import Contents from "../../styles/Layout/Contents";
import { useDispatch, useSelector } from "react-redux";
import { selectPhoto, deletePhoto } from "../../store/photos";
import { useEffect, useState } from "react";
import { loginCheck } from "../../store/users";
import Pcomment from "../Pcomment/Pcomment";
import AuthRouter from "../AuthRouter";
import styled from "styled-components";

function Photo() {
  const dispatch = useDispatch();
  const myId = useSelector((state) => state.users.me);
  const myPhoto = useSelector((state) => state.photos.allPhoto);

  const photoDispatch = async () => {
    await dispatch(selectPhoto(myId.id));
  };

  const onClickDelete = async (id) => {
    await dispatch(deletePhoto(id));
    await dispatch(selectPhoto(myId.id));
  };

  useEffect(() => {
    photoDispatch();
  }, []);

  const navigate = useNavigate();
  const moveTo = () => {
    return navigate("/PhotoAdd");
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
            <Button onClick={moveTo}>사진등록</Button>
            {myPhoto.loading ? (
              <Spinner>loading...</Spinner>
            ) : (
              myPhoto.photos.map((photo) => (
                <>
                  <PhotoList
                    key={photo.id}
                    photo={photo}
                    onClickDelete={onClickDelete}
                  ></PhotoList>
                </>
              ))
            )}
          </Card>
        </Contents>
      </Layout>
      <AuthRouter></AuthRouter>
    </>
  );
}
export default Photo;
