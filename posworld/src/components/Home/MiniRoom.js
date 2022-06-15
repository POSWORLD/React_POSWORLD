import { publicUrl } from "../../utils/utils";
import styled from "styled-components";
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
  return (
    <>
      <ContentSection>
        <div>
          <h6>미니룸</h6>
          <div>
            <img
              src={publicUrl + "/resources/img/miniroom.gif"}
              alt="miniroom"
            />
          </div>
        </div>
      </ContentSection>
      <ContentSection>
        <h6>한 줄 감성</h6>
        <ul>
          <li>안녕</li>
          <li>헤헤~☆</li>
          <li>하하~☆</li>
        </ul>
      </ContentSection>
    </>
  );
}
export default MiniRoom;
