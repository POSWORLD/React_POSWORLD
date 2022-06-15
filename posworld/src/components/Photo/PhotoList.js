import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

function PhotoList() {
  const navigate = useNavigate();
  const moveTo = () => {
    navigate("/PhotoUpdate");
  };
  return (
    <>
      <div>[스크랩] 직장인 ver </div>
      <p>2022.06.22 22:27</p>
      <div> img 사진</div>
      <div> content 집에 가고싶다...</div>
      <Button onClick={moveTo}>수정</Button>
      <Button>삭제</Button>
    </>
  );
}

export default PhotoList;
