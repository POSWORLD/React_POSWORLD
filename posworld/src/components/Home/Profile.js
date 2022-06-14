import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Container, Input } from "reactstrap";
import { IMG_PATH } from "../../http/CustomAxios";
import AuthRouter from "../AuthRouter";
import "./Profile.css";
import ProfileUpdate from "./ProfileUpdate";
import {
  MdLink,
  MdMailOutline,
  MdLocationOn,
  MdPhoneIphone,
} from "react-icons/md";

function Profile() {
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
    <div className="ProfileSection">
      <img src={`${IMG_PATH}${proPhoto}`} alt="proPhoto"></img>
      <p>
        <input value={"TODAY IS..."} readOnly></input>
      </p>
      <p>
        <span className="my-name">{name}</span>
        <span className="my-sex">({genderSign})</span>
        <Button onClick={modalOpen}>edit</Button>
      </p>
      <p>
        <MdMailOutline />
        {name}@posworld.com
      </p>
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
export default Profile;
