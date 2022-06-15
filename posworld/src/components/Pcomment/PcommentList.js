import { Button, Card } from 'reactstrap';
import changeTime from './changeTime';

function PcommentList({ comment }) {
   return (
      <>
         <Card className="commentCard">
            <div className="commentOne">
               {comment?.name} : {comment?.content} ({changeTime(comment?.wdate)})<Button>x</Button>
            </div>
         </Card>
      </>
   );
}
export default PcommentList;
