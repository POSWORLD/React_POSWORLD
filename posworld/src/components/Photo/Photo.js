import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import Card from "../../styles/Layout/Card";
import Layout from "../../styles/Layout/Layout";
import Sidebar from "../../styles/Layout/Sidebar";
import FlexWrapper from "../../styles/Layout/FlexWrapper";
import PhotoList from "./PhotoList";
import Profile from "../Home/Profile";
import Contents from "../../styles/Layout/Contents";
import photos from "../../store/photos";
import { useDispatch, useSelector } from "react-redux";
import { selectPhoto } from "../../store/photos";
import { useEffect, useState } from "react";
import { loginCheck } from "../../store/users";
import AuthRouter from "../AuthRouter";

function Photo() {
  const dispatch = useDispatch();
  const myId = useSelector((state) => state.users.me);
  const myPhoto = useSelector((state) => state.photos.allPhoto);

  const photoDispatch = async () => {
    console.log(myId.id);
    await dispatch(selectPhoto(myId.id));
  };

  useEffect(() => {
    photoDispatch();
  }, []);
  console.log(myPhoto);

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

            <PhotoList></PhotoList>
          </Card>
        </Contents>
      </Layout>
      <AuthRouter></AuthRouter>
    </>
  );
}
export default Photo;
