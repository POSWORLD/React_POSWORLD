import Layout from "../../styles/Layout/Layout";
import Sidebar from "../../styles/Layout/Sidebar";
import Card from "../../styles/Layout/Card";
import { useDispatch, useSelector } from "react-redux";
import { getOtherHome } from "../../store/homes";
import AuthRouter from "../AuthRouter";
import { useEffect } from "react";
import { getUser } from "../../store/users";
import FlexWrapper from "../../styles/Layout/FlexWrapper";
import OtherProfile from "./OtherProfile";
import OtherMiniRoom from "./OtherMiniRoom";
import OtherContents from "../../styles/Layout/OtherContents";

function Wave() {
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
