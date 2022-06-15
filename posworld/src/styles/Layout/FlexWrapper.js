import styled from "styled-components";
const FlexWrappers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const FlexWrapper = ({ children }) => {
  return <FlexWrappers>{children}</FlexWrappers>;
};

export default FlexWrapper;
