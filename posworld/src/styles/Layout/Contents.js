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

const Contents = ({ children }) => {
  const {title} = useSelector((state) => state.homes.home);
  return (
    <>
      <ContentWrapper>
        <h1>{title}</h1>
        {children}
        <MainMenu></MainMenu>
      </ContentWrapper>
      <AuthRouter></AuthRouter>
    </>
  );
};

export default Contents;
