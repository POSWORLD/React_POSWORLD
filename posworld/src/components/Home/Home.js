import Layout from "../../styles/Layout/Layout";
import Sidebar from "../../styles/Layout/Sidebar";
import Card from "../../styles/Layout/Card";
import Contents from "../../styles/Layout/Contents";
import styled from "styled-components";
import Profile from "./Profile";
import MiniRoom from "./MiniRoom";
import AuthRouter from "../AuthRouter";
import { useDispatch, useSelector } from "react-redux";
import { string } from "i/lib/util";
import { useEffect } from "react";
import { getHome } from "../../store/homes";
const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

function Home() {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.users.me);

  useEffect(() => {
    dispatch(getHome(id));
  });

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
