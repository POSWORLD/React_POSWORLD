import { Button, Input } from "reactstrap";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { insertComments } from "../../store/pComments";
import styled from "styled-components";
function PcommentAdd() {
  const myUser = useSelector((state) => state.users.me);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    content: "",
  });
  const onSubmit = async () => {
    await dispatch(insertComments(form));
  };

  const onChangeContent = (e) => {
    const { value } = e.target;
    setForm({ ...form, content: value });
  };

  const AddComment = styled.div`
    margin-top: 1rem;
    #inputs {
      margin-left: 0.5rem;
    }
    #confirm {
      margin-left: 0.5rem;
    }
  `;
  return (
    <>
      <AddComment>
        <div className="addComment">
          <p>
            {myUser.name}
            <input
              type="text"
              id="inputs"
              value={form.content}
              onChange={(e) => onChangeContent(e)}
            ></input>
            <Button id="confirm" type="button" outline onClick={onSubmit}>
              확인
            </Button>
          </p>
        </div>
      </AddComment>
    </>
  );
}

export default PcommentAdd;
