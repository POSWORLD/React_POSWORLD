import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCheckId, insertUser, login } from '../Store/users';
import './Join.css';

function Join() {
   const dispatch = useDispatch();
   const [isFail, setIsFail] = useState(false);
   const [text, setText] = useState('');
   const [user, setUser] = useState({
      userId: '',
      pw: '',
      name: '',
      gender: '',
   });

   const navigate = useNavigate();

   const onSubmitLogin = async e => {
      e.preventDefault();
      if (user.userId === '') {
         // id is null
         openAlert('아이디를 입력해주세요');
         return;
      } else if (user.pw === '') {
         // password is null
         openAlert('비밀번호를 입력해주세요');
         return;
      } else if (user.name === '') {
         // name is null
         openAlert('이름를 입력해주세요');
         return;
      }
      const checkId = await dispatch(getCheckId(user.userId)).unwrap();

      if (checkId) {
         openAlert('이미 존재하는 아이디입니다.');
         return;
      } else {
         await dispatch(insertUser(user));
         await dispatch(login(user));
         navigate('/');
      }
   };
   const openAlert = text => {
      setIsFail(true);
      setText(text);
      setTimeout(() => closeAlert(), 3000);
   };
   const closeAlert = () => {
      setIsFail(false);
      setText('');
   };
   const onChangeHandler = e => {
      const { name, value } = e.target;
      setUser({ ...user, [name]: value });
   };

   return (
      <div className="JoinPage">
         <div className="logo">
            <img
               src="https://user-images.githubusercontent.com/46432606/173168317-0ab35773-8f28-4f0b-8dd3-e43b275ee529.png"
               alt="Logo"></img>
         </div>

         <form onSubmit={onSubmitLogin} className="JoinForm">
            {isFail ? (
               <alert color="warning" toggle={() => closeAlert()}>
                  {text}
               </alert>
            ) : null}
            <input type="text" placeholder="ID" name="userId" onChange={e => onChangeHandler(e)}></input>
            <input type="button" name="checkId"></input>
            <input type="password" placeholder="password" name="pw" onChange={e => onChangeHandler(e)}></input>
            <input type="text" placeholder="name" name="name" onChange={e => onChangeHandler(e)}></input>
            <div className="gender">
               <lavel>성별</lavel>
               <input type="radio" value="M" name="gender" checked="checked"></input>남
               <input type="radio" value="W" name="gender"></input>여
            </div>
            <button type={'submit'} color="primary" id="joinBtn">
               가입
            </button>
         </form>
         <p>
            계정이 있으신가요? <a href="/login">로그인하러가기</a>
         </p>
         {/* <AuthRouter></AuthRouter> */}
      </div>
   );
}

export default Join;
