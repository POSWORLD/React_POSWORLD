import './Login.css';

function Login() {
    return (
        <div className="login">
            <form className="loginForm">
                <div>
                    <img
                        src="https://github.com/POSWORLD/React_POSWORLD/blob/master/posworld/public/img/logo.png?raw=true"
                        alt="logo"
                    ></img>
                </div>
                <br />
                <div>
                    <input type="text" placeholder="아이디" name="id"></input>
                </div>
                <br />
                <div>
                    <input type="password" placeholder="비밀번호" name="pw"></input>
                </div>

                <br />
                <br />
                <input type="submit" value="로그인"></input>
            </form>
        </div>
    );
}

export default Login;
