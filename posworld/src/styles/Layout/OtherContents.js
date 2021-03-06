import styled from "styled-components";
import MainMenu from "../Menu/MainMenu";
import { useSelector } from "react-redux";
import AuthRouter from "../../components/AuthRouter";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  h1 {
    color: ${(props) => props.color || "black"};
    font-weight: bold;
    font-size: 1.1rem;
  }
`;

const OtherContents = ({ children }) => {
  const home = useSelector((state) => state.homes.otherhome);
  return (
    <>
      <ContentWrapper>
        <h1>{home?.title}</h1>
        {children}
        <MainMenu></MainMenu>
      </ContentWrapper>
      <AuthRouter></AuthRouter>
    </>
  );
};

export default OtherContents;
