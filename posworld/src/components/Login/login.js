import { useEffect, useState } from "react";

function Login() {
  const [id,setId] = useState('')
  const [pw,setPw] = useState('')
  const handleInputId = (e) =>{
    setId(e.target.value)
  }
  const handleInputPw = (e) =>{
    setPw(e.target.value)
  }
  const onClickLogin = () =>{
    console.log('click login')
  }
  
  return (
    <form name='loginForm'>
      
      <div>
        <label htmlFor='id'>아이디 : </label>
        <input type='text' name ='id' value={id} onChange={handleInputId}/>
      </div>
      <div>
        <label htmlFor='pw'>비밀번호 : </label>
        <input type='text' name ='pw' value={pw} onChange={handleInputPw}/>
      </div>
      <div>
        <button type='button' onClick={onClickLogin}>로그인</button>
      </div>
      

    </form>
  );
}
export default Login;
