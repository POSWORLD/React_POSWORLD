import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Container, Input } from "reactstrap";
import { IMG_PATH } from "../../http/CustomAxios";
import AuthRouter from "../AuthRouter";
import "./Home.css";
import ProfileUpdate from "./ProfileUpdate";

function Home() {
  // console.log(useSelector((state) => state.users.me));
  const { id, userId, name, gender, proPhoto } = useSelector(
    (state) => state.users.me
  );
  const genderSign = gender == "m" ? "♀" : "♂";

  const [isOpen, setIsOpen] = useState(false);
  const modalClose = () => {
    setIsOpen(false);
  };
  const modalOpen = () => {
    setIsOpen(true);
  };

  return (
    <div className="HomePage">
      <Container>
        <img src={`${IMG_PATH}${proPhoto}`} alt="proPhoto"></img>
      </Container>
      <Container>
        <Input value={"TODAY IS..."} readOnly></Input>
      </Container>
      <Container>
        이름: {name} / 성별: {genderSign}
        &nbsp;&nbsp;&nbsp;
        <Button onClick={modalOpen}>edit</Button>
        <br></br>
        {name}@posworld.com
      </Container>
      <AuthRouter></AuthRouter>
      <ProfileUpdate
        name={name}
        proPhoto={proPhoto}
        isOpen={isOpen}
        modalClose={modalClose}
      ></ProfileUpdate>
    </div>
  );
}
export default Home;
