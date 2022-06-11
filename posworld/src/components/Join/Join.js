import "./Join.css";
function Join() {
  return (
    <div className="Join">
      <form className="JoinPage">
        <div className="logo">
          <img
            src="https://user-images.githubusercontent.com/46432606/173168317-0ab35773-8f28-4f0b-8dd3-e43b275ee529.png"
            alt="logo"
          ></img>
        </div>
        <input type="text" placeholder="아이디" name="id" id="inputId"></input>
        <button>중복체크</button>
        <p>중복이 아닙니다</p>
        <div>
          <input type="password" placeholder="비밀번호" name="pw"></input>
        </div>
        <div>
          <input type="text" placeholder="닉네임" name="name"></input>
        </div>
        <div className="gender">
          <label htmlFor="input">성별</label>
          <input type="radio" value="M" name="gender"></input>남자
          <input type="radio" value="F" name="gender"></input>여자
        </div>
        <input id="joinBtn" type="submit" value="회원가입"></input>
      </form>
    </div>
  );
}

export default Join;
