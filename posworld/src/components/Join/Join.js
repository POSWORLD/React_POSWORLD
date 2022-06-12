import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  Alert,
  Input,
  Button,
  FormGroup,
  Label,
} from "reactstrap";
import { idCheck, insertUser } from "../../store/users";
import { loginApi } from "../../store/usersApi";
import AuthRouter from "../AuthRouter";
import "./Join.css";

const Join = () => {
  const [isFail, setIsFail] = useState(false);
  const [text, setText] = useState("");
  const [user, setUser] = useState({
    userId: "",
    pw: "",
    name: "",
    gender: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    if (user.userId === "") {
      openAlert("아이디를 입력해주세요.");
      return;
    } else if (user.pw === "") {
      openAlert("비밀번호를 입력해주세요.");
      return;
    } else if (user.name === "") {
      openAlert("이름을 입력해주세요.");
      return;
    }

    const check = await dispatch(idCheck(user)).unwrap();
    if (check) {
      openAlert("이미 사용중인 아이디입니다.");
      return;
    } else {
      await dispatch(insertUser(user));
      navigate("/login");
    }
  };

  const openAlert = (text) => {
    setIsFail(true);
    setText(text);
    setTimeout(() => closeAlert(), 3000);
  };
  const closeAlert = () => {
    setIsFail(false);
    setText("");
  };

  return (
    <div className="JoinPage">
      <Container className="bg-light-border">
        <div align="center">
          <img
            src="https://user-images.githubusercontent.com/46432606/173168317-0ab35773-8f28-4f0b-8dd3-e43b275ee529.png"
            alt="Logo"
            width={250}
          ></img>
        </div>
      </Container>
      <Container className="bg-light-border">
        <Form className="JoinForm" onSubmit={onSubmitLogin}>
          {isFail ? (
            <Alert color="warning" toggle={() => closeAlert()}>
              {text}
            </Alert>
          ) : null}

          <Input
            type="text"
            placeholder="아이디"
            name="userId"
            onChange={(e) => onChangeHandler(e)}
            style={{ borderRadius: 20 }}
          ></Input>

          <Input
            type="password"
            placeholder="비밀번호"
            name="pw"
            style={{ borderRadius: 20 }}
            onChange={(e) => onChangeHandler(e)}
          ></Input>
          <Input
            type="text"
            placeholder="닉네임"
            name="name"
            style={{ borderRadius: 20 }}
            onChange={(e) => onChangeHandler(e)}
          ></Input>

          <FormGroup align="center">
            <Input
              name="gender"
              type="radio"
              value="m"
              onChange={(e) => onChangeHandler(e)}
            />{" "}
            <Label check>남</Label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Input
              name="gender"
              type="radio"
              value="f"
              onChange={(e) => onChangeHandler(e)}
            />{" "}
            <Label check>여</Label>
          </FormGroup>
          <Button
            type="submit"
            color="secondary"
            style={{ borderRadius: 20 }}
            block
          >
            가입
          </Button>
        </Form>
      </Container>

      <Container className="bg-light-border">
        <div align="center">
          <p>
            계정이 있으신가요?&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="/login">로그인</a>
          </p>
        </div>
      </Container>
      <AuthRouter></AuthRouter>
    </div>
  );
};

export default Join;
