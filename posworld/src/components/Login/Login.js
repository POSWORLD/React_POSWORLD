import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Input, Button, Alert } from "reactstrap";
import { login } from "../../store/users";
import AuthRouter from "../AuthRouter";
import "./Login.css";

const Login = () => {
  const [isFail, setIsFail] = useState(false);
  const [user, setUser] = useState({
    userId: "",
    pw: "",
  });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmitLogin = async (e) => {
    e.preventDefault();
    const { isLogin } = await dispatch(login(user)).unwrap();
    if (isLogin) {
      navigate("/");
    } else {
      setIsFail(true);
      setTimeout(() => closeAlert(), 3000);
    }
  };

  const closeAlert = () => {
    setIsFail(false);
  };

  return (
    <div className="LoginPage">
      <Container>
        <div align="center">
          <img
            src="https://user-images.githubusercontent.com/46432606/173168317-0ab35773-8f28-4f0b-8dd3-e43b275ee529.png"
            alt="Logo"
            width={250}
          ></img>
        </div>
      </Container>
      <Container>
        <Form className="LoginForm" onSubmit={onSubmitLogin}>
          {isFail ? (
            <Alert color="warning" toggle={() => closeAlert()}>
              아이디 또는 비밀번호가 틀렸습니다.
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
            onChange={(e) => onChangeHandler(e)}
            style={{ borderRadius: 20 }}
          ></Input>
          <Button
            type="submit"
            color="secondary"
            style={{ borderRadius: 20 }}
            block
          >
            로그인
          </Button>
        </Form>
      </Container>
      <Container className="bg-light-border">
        <div align="center">
          <p>
            계정이 없으신가요?&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="/join">가입하기</a>
          </p>
        </div>
      </Container>
      <AuthRouter></AuthRouter>
    </div>
  );
};

export default Login;
