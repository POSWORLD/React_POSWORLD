import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PcommentAdd from "./PcommentAdd";
import PcommentList from "./PcommentList";
import pComments, {
  deleteComments,
  insertComments,
  selectComments,
} from "../../store/pComments";
import { Container, Spinner } from "reactstrap";
import { ImPencil } from "react-icons/im";
import styled from "styled-components";

const Wrap = styled.div`
  margin-top: 10px;
  z-index: 10;
  border: 1px solid black;
  margin-top: 10px;
  padding: 10px;
  text-align: left;
  overflow-y: inherit;
`;

function Pcomment({ pid, comment, deleteComments }) {
  const dispatch = useDispatch();

  const [idx, setIdx] = useState(0);

  const commentPatch = async (pid) => {
    await dispatch(selectComments(pid));
  };
  const onSubmit = async (form, pid) => {
    await dispatch(insertComments(form));
    await dispatch(selectComments(pid));
  };
  useEffect(() => {
    commentPatch(pid);
  }, []);
  return (
    <>
      {comment[idx].pid === pid ? (
        <>
          <Wrap>
            <div>
              <ImPencil></ImPencil> 댓글 {comment.length}
            </div>
            <Container>
              {comment.loading ? (
                <Spinner>loading...</Spinner>
              ) : (
                <>
                  {comment.map((coms) => (
                    <>
                      <PcommentList
                        key={coms.id}
                        comment={coms}
                        onClickDelete={deleteComments}
                        pid={pid}
                      ></PcommentList>
                    </>
                  ))}
                </>
              )}
              <PcommentAdd onSubmit={onSubmit} pid={pid}></PcommentAdd>
            </Container>
          </Wrap>
        </>
      ) : (
        <></>
      )}
    </>
  );

}
export default Pcomment;
