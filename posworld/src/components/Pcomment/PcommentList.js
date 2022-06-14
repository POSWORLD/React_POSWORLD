import { Button, Card } from "reactstrap";

function PcommentList({ comment }) {
  return (
    <>
      <Card className="commentCard">
        <div className="commentOne">
          {comment?.name} : {comment?.content}({comment?.wdate})
          <Button>x</Button>
        </div>
      </Card>
    </>
  );
}
export default PcommentList;
