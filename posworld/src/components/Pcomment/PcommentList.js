import changeTime from "./changeTime";
import styled from "styled-components";
const Wrap = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  .commentOne {
    background:${(props) => props.color || "#f0f0f0"};
    border-bottom: dashed 1px black;
    margin-top: 5px;
    margin-left: 3px;
    width: auto;
  }
  #delete {
    color: black;
    background: white;
    margin-left: 1.5rem;
    width: 1.5rem;
    height: 1.5rem;
    font-size: 1rem;
    align-items: center;
    display: inline-flex;
    flex-direction: column;
    justify-content: flex-start: 
  }
`;
function PcommentList({ comment, onClickDelete, pid }) {
  return (
    <>
      <Wrap>
        <div className="commentOne">
          {comment?.name} : {comment?.content} ({changeTime(comment?.wdate)})
          <button id="delete" onClick={() => onClickDelete(comment?.id, pid)}>
            x
          </button>
        </div>
      </Wrap>
    </>
  );
}
export default PcommentList;
