import styled from "styled-components";
import MainMenu from "../Menu/MainMenu";

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
  return (
    <ContentWrapper>
      <h1>현민이의 미니룸</h1>
      {children}
      <MainMenu></MainMenu>
    </ContentWrapper>
  );
};

export default Contents;
