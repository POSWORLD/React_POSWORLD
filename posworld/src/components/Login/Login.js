import './Login.css';

function Login() {
    return (
        <div className="login">
            <form className="loginForm">
                <div>
                    <img src="https://user-images.githubusercontent.com/46432606/173168317-0ab35773-8f28-4f0b-8dd3-e43b275ee529.png"></img>
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
