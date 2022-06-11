import "./Login.css";
import Form from "./Form.js";
function Login() {
  return (
    <div className="LoginPage">
      <form className="LoginPage">
        <input type="text" placeholder="아이디" name="id"></input>
        <div>
          <input type="password" placeholder="비밀번호" name="pw"></input>
        </div>
        <input type="submit" value="로그인"></input>
      </form>
      <Form></Form>
    </div>
  );
}
export default Login;
