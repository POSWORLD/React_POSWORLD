import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "reactstrap";
import { IMG_PATH } from "../../http/CustomAxios";
import AuthRouter from "../AuthRouter";
import "./Profile.css";
import styled from "styled-components";
import ProfileUpdate from "./ProfileUpdate";
import { MdLink, MdMailOutline } from "react-icons/md";
import { countUser, getUser, logout } from "../../store/users";
import { useNavigate } from "react-router-dom";
import homes from "../../store/homes";

const ProfileSection = styled.section`
  height: fit-content !important;
  &:last-of-type {
    padding: 10px 0;
    border-top: 1px dashed #a5a5a5;
    p {
      display: flex;
      align-items: center;
      margin: 10px 0;
    }
    svg {
      margin-right: 3px;
      color: #666;
    }
  }
  input {
    width: 100%;
  }
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  .my-name {
    margin-right: 5px;
    color: #238db3;
    font-size: 1rem;
    font-weight: bold;
  }
  .my-sex {
    color: #9e9e9e;
    font-size: 0.85rem;
  }
  .my-sex {
    margin-right: 2px;
    font-size: 0.8rem;
  }

  .my-email {
    font-size: 0.7rem;
    color: #eb8f11;
  }
`;
function Profile() {
  const homeId = useSelector((state) => state.homes.homeId);
  const id = useSelector((state) => state.users.myId);
  const profiles = useSelector((state) => state.users.myProfile.profiles);

  const dispatch = useDispatch();
  const nevigate = useNavigate();

  const profileDispatch = async () => {
    await dispatch(getUser(homeId));
  };

  useEffect(() => {
    profileDispatch();
  }, []);

  const genderSign = profiles.gender === "m" ? "♀" : "♂";

  const [isOpen, setIsOpen] = useState(false);
  const modalClose = () => {
    setIsOpen(false);
  };
  const modalOpen = () => {
    setIsOpen(true);
  };

  const wave = async () => {
    const countUserNum = await dispatch(countUser());
    const userNum = countUserNum.payload;

    const rand = Math.floor(Math.random() * userNum) + 1;

    if (rand != id) {
      alert(rand);
      window.location.href = `/Home?id=${rand}`;
    }
  };

  const logoutBtn = async () => {
    dispatch(logout());
    nevigate("/login");
  };

  const myHome = () => {
    window.location.href = "/";
  };

  return (
    <>
      <ProfileSection>
        <img src={`${IMG_PATH}${profiles.prophoto}`} alt="proPhoto"></img>
        <p>
          <input value={"TODAY IS..."} readOnly></input>
        </p>
      </ProfileSection>
      <ProfileSection>
        <p>
          <span className="my-name">{profiles.name}</span>
          <span className="my-sex">({genderSign})</span>
          {homeId === id ? (
            <>
              <Button
                onClick={modalOpen}
                color="primary"
                size="sm"
                style={{ margin: "3px" }}
              >
                edit
              </Button>
              <Button onClick={logoutBtn} color="primary" size="sm">
                logout
              </Button>
            </>
          ) : (
            <Button onClick={myHome} color="primary" size="sm">
              마이홈
            </Button>
          )}
        </p>
        <p className="my-email">
          <MdMailOutline color="#EB8F11" />
          {profiles.userid}@posworld.com
        </p>
        <p>
          <button onClick={wave}>파도타기</button>
        </p>
        <AuthRouter></AuthRouter>
        <ProfileUpdate
          id={id}
          userid={profiles.userid}
          name={profiles.name}
          prophoto={profiles.prophoto}
          isOpen={isOpen}
          modalClose={modalClose}
        ></ProfileUpdate>
      </ProfileSection>
    </>
  );
}
export default Profile;
