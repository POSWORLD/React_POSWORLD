import './Join.css';

function Join() {
    return (
        <div className="join">
            <form className="joinForm">
                <div>
                    <img
                        src="https://user-images.githubusercontent.com/46432606/173168317-0ab35773-8f28-4f0b-8dd3-e43b275ee529.png"
                        alt="logo"
                    ></img>
                </div>
                <br />
                <div>
                    <input type="text" placeholder="아이디" name="id"></input>
                    <button>중복체크</button>
                    <p>사용 가능한 아이디 입니다.</p>
                </div>
                <br />
                <div>
                    <input type="password" placeholder="비밀번호" name="pw"></input>
                </div>
                <br />
                <div>
                    <input type="text" placeholder="닉네임" name="name"></input>
                </div>
                <br />
                <div className="gender">
                    성별
                    <br />
                    <input type="radio" value="M" name="gender"></input>M<input type="radio" value="F" name="gender"></input>F
                </div>
                <br />
                <input type="submit" value="회원가입"></input>
            </form>
        </div>
    );
}

export default Join;
