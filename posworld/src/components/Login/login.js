import {  useState } from "react";

function Login() {
  const [id,setId] = useState('');
  const [pw,setPw] = useState('');

  const handleInputId = (e) =>{
    setId(e.currentTarget.value);
  }
  const handleInputPw = (e) =>{
    setPw(e.currentTarget.value);
  }
  const onSubmitLogin = (e) =>{
    e.preventDefault();
  }
  
  return (
    <form className='loginForm'>
      
      <div>
        <label htmlFor='id'>아이디 : </label>
        <input type='text' name ='id' value={id} onChange={handleInputId}/>
      </div>
      <div>
        <label htmlFor='pw'>비밀번호 : </label>
        <input type='password' name ='pw' value={pw} onChange={handleInputPw}/>
      </div>
      <div>
        <input type='submit' name='loginBtn' onSubmit={onSubmitLogin} value='로그인'/>
      </div>
      <div>
        <a href="/join">회원가입하러가기</a>
      </div>
      

    </form>
  );
}
export default Login;
