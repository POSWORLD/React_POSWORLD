import { Button, Card } from "reactstrap";
import chnageTime from "./changeTime";

function PcommentList({ comment }) {
  return (
    <>
      <Card className="commentCard">
        <div className="commentOne">
          {comment?.name} : {comment?.content} ({chnageTime(comment?.wdate)})
          <Button>x</Button>
        </div>
      </Card>
    </>
  );
}
export default PcommentList;
