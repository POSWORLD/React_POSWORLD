import { publicUrl } from "../../utils/utils";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
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
function MiniRoom({ title, content }) {
  const home = useSelector((state) => state.homes.myhome);
  console.log(home);

  const dispatch = useDispatch();
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    setForm({ title, content });
  }, [title, content]);

  return (
    <>
      <ContentSection>
        <div>
          <h6>미니홈</h6>
          <div>
            <img src={"img/uploadImg.png"} alt="miniroom" />
          </div>
        </div>
      </ContentSection>
      <ContentSection>
        <h6>한 줄 감성</h6>
        <ul>
          <li>{home.content}</li>
        </ul>
      </ContentSection>
    </>
  );
}
export default MiniRoom;
