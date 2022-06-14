import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background: ${(props) => props.color || "#40E0D0"};
`;

const BorderWrapper = styled.div`
  width: 75%;
  height: 95vh;
  padding: 25px;
  background: ${(props) => props.color || "#ACF3FF"};
  border: 1px solid ${(props) => props.color || "black"};
  border-radius: 10px;
`;

const BgWrapper = styled.div`
  z-index: 1;
  position: relative;
  display: flex;
  height: 100%;
  padding: 20px 8px 8px;
  background: ${(props) => props.color || "gray"};
  border: 2px dashed ${(props) => props.color || "#AE905E"};
  border-radius: 10px;
`;

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <BorderWrapper>
        <BgWrapper>{children}</BgWrapper>
      </BorderWrapper>
    </Wrapper>
  );
};

export default Layout;
