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

function OtherMiniRoom(title, content, photo) {
  const home = useSelector((state) => state.homes.otherhome);
  const homeId = useSelector((state) => state.homes.homeId);
  //   useEffect(() => {
  //     setForm({ title, content, photo });
  //   }, [title, photo, content]);
  return (
    <>
      <ContentSection>
        <div>
          <p>
            <h6>미니룸</h6>
          </p>
          <div>
            <img src={`${IMG_PATH}${home.photo}`} alt="miniroom"></img>
          </div>
        </div>
      </ContentSection>
      <ContentSection>
        <h6>한 줄 감성</h6>
        <ul>
          <li>{home.content}</li>
        </ul>
      </ContentSection>
      <AuthRouter></AuthRouter>
      <HomeUpdate
        title={home.title}
        photo={home.photo}
        content={home.content}
      ></HomeUpdate>
    </>
  );
}
export default OtherMiniRoom;
