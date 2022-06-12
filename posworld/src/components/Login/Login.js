import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../Store/users';
import './Login.css';

function Login() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [isFail, setIsFail] = useState(false);
   const [user, setUser] = useState({
      userId: '',
      pw: '',
   });
   const onChangeHandler = e => {
      const { name, value } = e.target;
      setUser({ ...user, [name]: value });
   };

   const onSubmitLogin = async e => {
      e.preventDefault();
      const { isLogin } = await dispatch(login(user)).unwrap();

      if (isLogin) {
         navigate('/');
      } else {
         setIsFail(true);
         setTimeout(() => closeAlert(), 3000);
      }
   };
   const closeAlert = () => {
      setIsFail(false);
   };
   return (
      <div className="loginPage">
         <img
            src="https://user-images.githubusercontent.com/46432606/173168317-0ab35773-8f28-4f0b-8dd3-e43b275ee529.png"
            alt="Logo"></img>
         <form onSubmit={onSubmitLogin} className="LoginForm">
            {isFail ? (
               <alert color="warning" toggle={() => closeAlert()}>
                  아이디 또는 비밀번호가 틀렸습니다.
               </alert>
            ) : null}
            <input type="text" placeholder="아이디" name="userId" onChange={e => onChangeHandler(e)}></input>
            <input tpye="password" placeholder="비밀번호" name="pw" onChange={e => onChangeHandler(e)}></input>
            <button type="submit">로그인</button>
            <p>아직 계정이 없으신가요?</p>
            <a href="/join">회원가입</a>
         </form>
      </div>
   );
}

export default Login;
