import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import Card from "../../styles/Layout/Card";
import Layout from "../../styles/Layout/Layout";
import Sidebar from "../../styles/Layout/Sidebar";
import FlexWrapper from "../../styles/Layout/FlexWrapper";
import PhotoList from "./PhotoList";
import Profile from "../Home/Profile";
import Contents from "../../styles/Layout/Contents";
import Pcomment from "../Pcomment/Pcomment";

function Photo() {
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
            <PhotoList>
              <Pcomment></Pcomment>
            </PhotoList>
          </Card>
        </Contents>
      </Layout>
    </>
  );
}
export default Photo;
