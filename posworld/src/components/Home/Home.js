import Layout from "../../styles/Layout/Layout";
import Sidebar from "../../styles/Layout/Sidebar";
import Card from "../../styles/Layout/Card";
import Contents from "../../styles/Layout/Contents";
import styled from "styled-components";
import Profile from "./Profile";
import MiniRoom from "./MiniRoom";
import { useDispatch, useSelector } from "react-redux";
import { getHome } from "../../store/homes";
import AuthRouter from "../AuthRouter";
import { useEffect } from "react";
import { loginCheck } from "../../store/users";
import FlexWrapper from "../../styles/Layout/FlexWrapper";

function Home() {
  const dispatch = useDispatch();
  const getHomeCommand = () => {
    dispatch(loginCheck())
      .unwrap()
      .then((data) => {
        dispatch(getHome(data.id));
      });
  };
  useEffect(() => {
    console.log("되었댜");
    getHomeCommand();
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
            <MiniRoom></MiniRoom>
          </Card>
        </Contents>
      </Layout>
      <AuthRouter></AuthRouter>
    </>
  );
}
export default Home;
