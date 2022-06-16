import { Button } from "reactstrap";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
const AddComment = styled.section`
  margin-top: 1rem;
  #inputs {
    margin-left: 0.5rem;
  }
  #confirm {
    margin-left: 0.5rem;
  }
`;
function PcommentAdd({ onSubmit, pid }) {
  const myUser = useSelector((state) => state.users.me);
  const [form, setForm] = useState({
    content: "",
    pid: pid,
  });

  const onChangeContent = (e) => {
    const { value } = e.target;
    setForm({ ...form, content: value });
  };

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
            <Button
              id="confirm"
              type="button"
              outline
              onClick={() => onSubmit(form)}
            >
              확인
            </Button>
          </p>
        </div>
      </AddComment>
    </>
  );
}

export default PcommentAdd;
