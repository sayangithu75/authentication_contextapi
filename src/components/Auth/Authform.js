import React,{useState,useContext} from 'react'
import AuthContext from '../store/auth-context';
import {useNavigate} from 'react-router-dom';
import  classes from './Authform.module.css';


const Auth=()=>{
    const navigate=useNavigate();
    const [isLogin,setIsLogin]=useState(true);
    const [email,setEmail]=useState("");
    const [pass,setPass]=useState("");
    const authCtx=useContext(AuthContext);
    const switchAuthModeHandler=(e)=>{
        e.preventDefault();
        setIsLogin((prevState) => !prevState);
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        let url;
        if(isLogin)
        {
           url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyADh9DGErPzDK-4R2kAp87chA5iXDS6MkA"
        }
        else
        {
           url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyADh9DGErPzDK-4R2kAp87chA5iXDS6MkA" 
        }
        fetch(url ,{
            method:'POST',
            body:JSON.stringify({
                email:email,
                password:pass,
                returnSecureToken:true
            }),
            headers:{
                'Content-Type': 'application/json'
            },
        }).then(res=>{
            if(res.ok){
              return res.json();
            }
            else{
                return res.json().then(data=>{
                    let errorMessage="Authentication Failed";
                    if(data && data.error && data.error.message){
                      errorMessage=data.error.message;
                    }
                    // alert(errorMessage);
                    throw new Error(errorMessage);
                });
            }
        }).then(data => {
          console.log(data);
          authCtx.login(data.idToken);
          navigate('./Home');
        }).catch(error=>{
          alert(error.message);
        })
    }

    return(
     <section className={classes.auth}>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={submitHandler}>

            <div className={classes.control}>
                <label htmlFor="email">Your Email</label>
                <input type='email' id='email' value={email} onChange={e=>setEmail(e.target.value)}/>
            </div>
            <div className={classes.control}>
                <label htmlFor="password">Password</label>
                <input type='password' id="password" value={pass} onChange={e=>setPass(e.target.value)}/>
            </div>
            <div className={classes.actions}>
                <button>{isLogin ? 'Login' : 'Create Account'}</button>
                <button
                    type= 'button'
                    className={classes.toggle}
                    onClick={switchAuthModeHandler}
                    >
                    {isLogin ? 'Create new account' : 'Login with existing account'}
                </button>
            </div>
        </form>
    </section>
    )
}

export default Auth;