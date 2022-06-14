import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PcommentAdd from "./PcommentAdd";
import PcommentList from "./PcommentList";
import pComments, { selectComments } from "../../store/pComments";
import { Container, Spinner } from "reactstrap";

function Pcomment() {
  const myComments = useSelector((state) => state.pComments.allPComment);
  const dispatch = useDispatch();
  const commentPatch = async () => {
    await dispatch(selectComments());
  };
  useEffect(() => {
    commentPatch();
  }, []);
  return (
    <>
      <div>댓글 {myComments.comments.length}</div>
      <Container>
        {myComments.loading ? (
          <Spinner>loading...</Spinner>
        ) : (
          myComments.comments.map((comment) => (
            <PcommentList key={comment.id} comment={comment}></PcommentList>
          ))
        )}

        <PcommentAdd></PcommentAdd>
      </Container>
    </>
  );
}
export default Pcomment;
