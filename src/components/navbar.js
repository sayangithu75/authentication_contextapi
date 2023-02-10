import React , {useContext} from 'react'
import {Link,useNavigate} from "react-router-dom"
import './navbar.css'
import AuthContext from './store/auth-context'

const Nav=()=>{
    const navigate=useNavigate();
    const authCtx=useContext(AuthContext)
    const isLoggedIn=authCtx.isLoggedIn
    const logoutHandler=()=>{
        authCtx.logout();
        navigate('./');
    }
    return (
        <nav className="nav">
            <Link className="link" to="/">Site Name</Link>
            <ul>
                {!isLoggedIn && (<li><Link className="link" to="/">Login</Link></li>)}
                {isLoggedIn && (<li><Link className="link" to="/About">About</Link></li>)}
                {isLoggedIn && (<li><Link className="link" to="/Home">Home</Link></li>)}
                {isLoggedIn && (<li><button onClick={logoutHandler}>Logout</button></li>)}
            </ul>
        </nav>
    )
}

export default Nav