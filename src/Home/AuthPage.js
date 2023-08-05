import React , { useRef, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useRegisterMutation } from './api/authApi';
import { login } from './api/authSlice';
import './AuthPage.css'

const AuthPage = () => {
    const [isLoginForm,setIsLoginForm] = useState(true)

    const [regFn,{error:regError}] = useRegisterMutation();
    const [loginFn,{error:loginError}] = useLoginMutation();

    const usernameInp = useRef();
    const pwdInp = useRef();
    const emailInp = useRef();

    const dispatch = useDispatch();
    // const history = useHistory();
    const navigate = useNavigate();
    const submitHandler=(e)=>{
        e.preventDefault();
        const username = usernameInp.current.value;
        const password = pwdInp.current.value;
        if(isLoginForm){
            // console.log(username,password);
            loginFn({
                identifier:username,
                password
            }).then(res=>{
                if(!res.error){
                    dispatch(login({
                        token:res.data.jwt,
                        user:res.data.user,
                    }))
                    navigate("/DataAnalysis",{replace:true})
                    // history("/DataAnalysis",{replace:true})
                }
            })
        }
        else{
            const email = emailInp.current.value;
            // console.log(usename,password,email);
            regFn({
                username,
                password,
                email
            }).then(res=>{

                if(!res.error){
                    setIsLoginForm(true)
                }
            })
        }
    }
    return (
        <div className='authDiv'>
            <p className='authP'>
                {regError && regError.data.error.message}
                {loginError && '用户名或密码错误！'}
            </p>
            <h2 className='authH2'>{isLoginForm? "登录":"注册"}</h2>
            <form onSubmit={submitHandler} className='authForm'> 
                <div className='authForm-Username'>
                    <input ref={usernameInp} type="text" placeholder={"用户名"} className='authUsername-Inp'/>
                </div>
                {
                    !isLoginForm && 
                    <div className='authEmail'>
                        <input ref={emailInp} type="email" placeholder={"电子邮箱"} className='authEmail-Inp'/>
                    </div>
                }
                <div className='authForm-Password'>
                    <input ref={pwdInp} type="password" placeholder={"密码"} className='authPassword-Inp'/>
                </div>
                <div className='authForm-Login'>
                    <button className='authLogin-But'>{isLoginForm? "登录":"注册"}</button>
                    <a href="#" onClick={event=>{
                        event.preventDefault();
                        setIsLoginForm(prevState => !prevState )
                    }}>
                        {isLoginForm? "没有账号，点击注册":"已有账号，点击登录"}
                    </a>
                </div>
            </form>
        </div>
    );
}

export default AuthPage;
