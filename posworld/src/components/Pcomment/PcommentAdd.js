import { Button, Input } from "reactstrap";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { insertComments } from "../../store/pComments";

function PcommentAdd() {
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
  return (
    <>
      <div className="addComment">
        <p>
          사용자 이름
          <input
            type="text"
            value={form.content}
            onChange={(e) => onChangeContent(e)}
          ></input>
          <Button type="button" outline onClick={onSubmit}>
            확인
          </Button>
        </p>
      </div>
    </>
  );
}

export default PcommentAdd;
