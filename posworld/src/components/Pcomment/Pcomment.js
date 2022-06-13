import { Button, Input } from "reactstrap";

function Pcomment() {
  const onSubmit = () => {};
  return (
    <>
      <div className="addComment">
        <p>사용자 이름</p>
        <Input type="text"></Input>
        <Button type="button" outline onClick={onSubmit}>
          확인
        </Button>
      </div>
    </>
  );
}

export default Pcomment;
