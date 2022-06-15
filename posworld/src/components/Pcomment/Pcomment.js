import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PcommentAdd from "./PcommentAdd";
import PcommentList from "./PcommentList";
import pComments, {
  deleteComments,
  selectComments,
} from "../../store/pComments";
import { Container, Spinner } from "reactstrap";
import { ImPencil } from "react-icons/im";
import styled from "styled-components";

const Wrap = styled.div`
  z-index: 10;
  border: 1px solid black;
  margin-top: 10px;
  padding: 10px;
  text-align: left;
  overflow-y: inherit;
`;

function Pcomment() {
  const myComments = useSelector((state) => state.pComments.allPComment);
  console.log(myComments);
  const dispatch = useDispatch();
  const onClickDelete = (commentID) => {
    dispatch(deleteComments(commentID));
    dispatch(selectComments());
  };
  const commentPatch = async () => {
    await dispatch(selectComments());
  };
  useEffect(() => {
    commentPatch();
  }, []);
  return (
    <>
      <Wrap>
        <div>
          <ImPencil></ImPencil> 댓글 {myComments.comments.length}
        </div>
        <Container>
          {myComments.loading ? (
            <Spinner>loading...</Spinner>
          ) : (
            myComments.comments.map((comment) => (
              <PcommentList
                key={comment.id}
                comment={comment}
                onClickDelete={onClickDelete}
              ></PcommentList>
            ))
          )}

          <PcommentAdd></PcommentAdd>
        </Container>
      </Wrap>
    </>
  );
}
export default Pcomment;
