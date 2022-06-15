import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  z-index: 10;
  overflow-y: auto;
  width: 100%;
  height: 96%;
  margin-top: 10px;
  padding: 20px;
  border: 1px solid ${(props) => props.color || "black"};
  border-radius: 10px;
  background: ${(props) => props.color || "white"};
  section {
    width: 100%;
    height: 100%;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Card = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Card;
