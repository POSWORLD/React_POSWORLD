import Layout from "../../styles/Layout/Layout";
import Sidebar from "../../styles/Layout/Sidebar";
import Card from "../../styles/Layout/Card";
import Contents from "../../styles/Layout/Contents";
import styled from "styled-components";
import Profile from "./Profile";
import MiniRoom from "./MiniRoom";
const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

function Home() {
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
    </>
  );
}
export default Home;