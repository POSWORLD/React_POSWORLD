import Layout from "../../styles/Layout/Layout";
import Sidebar from "../../styles/Layout/Sidebar";
import Card from "../../styles/Layout/Card";
import Contents from "../../styles/Layout/Contents";
import Profile from "./Profile";
import MiniRoom from "./MiniRoom";
import { useDispatch, useSelector } from "react-redux";
import { getHome, getOtherHome } from "../../store/homes";
import AuthRouter from "../AuthRouter";
import { useEffect } from "react";
import { getUser, loginCheck } from "../../store/users";
import FlexWrapper from "../../styles/Layout/FlexWrapper";
import { useState } from "react";
import OtherProfile from "./OtherProfile";
import OtherMiniRoom from "./OtherMiniRoom";
import OtherContents from "../../styles/Layout/OtherContents";

function Wave() {
  // console.log(new URLSearchParams(window.location.search).get("id"));
  const otherid = new URLSearchParams(window.location.search).get("id");
  const dispatch = useDispatch();

  const getProfile = (otherid) => {
    dispatch(getUser(otherid));
  };

  const getHomeCommand = (otherid) => {
    dispatch(getOtherHome(otherid));
  };

  useEffect(() => {
    getHomeCommand(otherid);
    getProfile(otherid);
  }, []);

  return (
    <>
      <Layout>
        <Sidebar>
          <Card>
            <FlexWrapper>
              <OtherProfile></OtherProfile>
            </FlexWrapper>
          </Card>
        </Sidebar>
        <OtherContents>
          <Card>
            <OtherMiniRoom></OtherMiniRoom>
          </Card>
        </OtherContents>
      </Layout>
      <AuthRouter></AuthRouter>
    </>
  );
}
export default Wave;
