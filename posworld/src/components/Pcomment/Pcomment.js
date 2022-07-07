import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PcommentAdd from "./PcommentAdd";
import PcommentList from "./PcommentList";
import {
  deleteComments,
  insertComments,
  selectComments,
} from "../../store/pComments";
import { Container } from "reactstrap";
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

function Pcomment() {
  const dispatch = useDispatch();
  const pid = useSelector((state) => state.pComments.pid);
  const pcomment = useSelector((state) => state.pComments.comments);

  const commentPatch = () => {
    dispatch(selectComments());
  };

  const commentsDelete = async (ids) => {
    await dispatch(deleteComments(ids));
    await dispatch(selectComments(ids.pid));
  };

  const onSubmit = async (form) => {
    await dispatch(insertComments(form));
    await dispatch(selectComments());
    form.content = "";
  };
  useEffect(() => {
    commentPatch();
  }, []);
  return (
    <>
      <Wrap>
        <div style={{ textAlign: "right" }}>
          <ImPencil></ImPencil> 댓글
        </div>
        <Container>
          {pcomment !== undefined ? (
            pcomment.map((coms) => (
              <PcommentList
                key={coms.id}
                comment={coms}
                onClickDelete={commentsDelete}
                pid={pid}
              ></PcommentList>
            ))
          ) : (
            <></>
          )}
          <PcommentAdd onSubmit={onSubmit} pid={pid}></PcommentAdd>
        </Container>
      </Wrap>
    </>
  );
}
export default Pcomment;
