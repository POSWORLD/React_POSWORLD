import "./Join.css";
function Join() {
  return (
    <div className="JoinPage">
      <form className="JoinPage">
        <input type="text" placeholder="아이디" name="id"></input>
        <button>중복체크</button>
        <p>중복이 아닙니다</p>
        <div>
          <input type="password" placeholder="비밀번호" name="pw"></input>
        </div>
        <div>
          <input type="text" placeholder="닉네임" name="name"></input>
        </div>
        <div className="gender">
          <input type="radio" value="M" name="gender"></input>M
          <input type="radio" value="F" name="gender"></input>F
        </div>
        <input type="submit" value="회원가입"></input>
      </form>
    </div>
  );
}

export default Join;
