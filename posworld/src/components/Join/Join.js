import { useState } from "react";

function Join() {
    const [id,setId] = useState('');
    const [pw,setPw] = useState('');
    const [name,setName] = useState('');
    const [gender,setGender] = useState('');

    const onIdHandler = (e) =>{
        setId(e.currentTarget.value);
    }
    const onPwHandler = (e) =>{
        setPw(e.currentTarget.value);
    }
    const onNameHandler = (e) =>{
        setName(e.currentTarget.value);
    }
    const onGenderHandler = (e) =>{
        setGender(e.currentTarget.value);
    }
    const onSubmitJoin = (e) =>{
        e.preventDefault();
    }

    return (
        <form className='joinForm'>
            <div>
                <label htmlFor='id'>아이디 : </label>
                <input type='text' name ='id' value={id} onChange={onIdHandler}/>
            </div>
            <div>
                <button className="checkId">중복체크</button>
            </div>
            <div>
                <label htmlFor='pw'>비밀번호 : </label>
                <input type='password' name ='pw' value={pw} onChange={onPwHandler}/>
            </div>
            <div>
                <label htmlFor='name'>이름 : </label>
                <input type='text' name ='name' value={name} onChange={onNameHandler}/>
            </div>
            <div>
                <label htmlFor='gender'>성별 : </label>
                M
                <input type='radio' name ='gender' value={gender} onChange={onGenderHandler}/>
                F
                <input type='radio' name ='gender' value={gender} onChange={onGenderHandler}/>
            </div>
            <div>
                <input type='submit' name='loginBtn' onSubmit={onSubmitJoin} value='회원가입'/>
            </div>
            

        </form>

    );

}

export default Join;
