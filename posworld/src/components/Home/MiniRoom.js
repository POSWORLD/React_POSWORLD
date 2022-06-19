import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IMG_PATH } from "../../http/CustomAxios";
import { Button } from "reactstrap";
import HomeUpdate from "./MiniRoomUpdate";
import AuthRouter from "../AuthRouter";
const ContentSection = styled.section`
  height: fit-content !important;
  h6 {
    padding: 5px;
    margin-bottom: 10px;
    font-weight: bold;
    color: ${(props) => props.color || "#238DB3"};
  }
  &:first-of-type {
    h6 {
      margin-bottom: 5px;
    }
    div {
      width: 100%;
      min-height: 200px;
      img {
        width: 100%;
      }
    }
  }
  &:last-of-type {
    margin-top: 20px;
    h6 {
      margin-bottom: 15px;
      border-bottom: 2px solid #eee;
    }
  }
  ul {
    line-height: 1.8;
    li {
      height: 30px;
      border-bottom: 1px dashed #a5a5a5;
      list-style: none;
    }
  }
`;

function MiniRoom() {
  const { title, content, photo } = useSelector(
    (state) => state.homes.home
  );
  

  const [isOpen, setIsOpen] = useState(false);
  const modalClose = () => {
    setIsOpen(false);
  };
  const modalOpen = () => {
    setIsOpen(true);
  };
  return (
    <>
      <ContentSection>
        <div>
          <p>
            <h6>미니룸</h6>
            <Button onClick={modalOpen} color="primary" size="sm">
              edit
            </Button>
          </p>
          <div>
            <img src={`${IMG_PATH}${photo}`} alt="miniroom"></img>
          </div>
        </div>
      </ContentSection>
      <ContentSection>
        <h6>한 줄 감성</h6>
        <ul>
          <li>{content}</li>
        </ul>
      </ContentSection>
      <AuthRouter></AuthRouter>
      <HomeUpdate
        title={title}
        photo={photo}
        content={content}
        isOpen={isOpen}
        modalClose={modalClose}
      ></HomeUpdate>
    </>
  );
}
export default MiniRoom;
