import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import PhotoList from "./PhotoList";

function Photo() {
  const navigate = useNavigate();
  const moveTo = () => {
    return navigate("/PhotoAdd");
  };
  return (
    <>
      <Button onClick={moveTo}>사진등록</Button>
      <PhotoList></PhotoList>
    </>
  );
}
export default Photo;
