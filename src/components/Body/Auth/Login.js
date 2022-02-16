import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {showErrMsg, showSuccessMsg} from "../../utils/Notification"

const initialState = { 
    email : "",
    password : "",
    err : "",
    success : ""
}

function Login() {
    const [user, setUser] = useState(initialState)
    const {email, password, err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: "", success: ""})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post("/user/login", {email, password})
            setUser({...user, err: "", success: res.data.msg})
            localStorage.setItem("token", true)
            window.location = "/";
        } catch (error) {
            error.response.data.msg &&
            setUser({...user, err: error.response.data.msg, success: ""})
        }
    }

  return (
    <div className='login_page' style={{marginTop:"100px"}}>
        <h2>Login</h2>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}

        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='email'>Email Address</label>
                <input type="text" placeholder='Enter your email id' id="email" required
                value={email} name="email" onChange={handleChangeInput} />
            </div>

            <div>
                <label htmlFor='password'>Password</label>
                <input type="password" placeholder='Enter your password' id='password' required
                 value={password} name="password" onChange={handleChangeInput} />
            </div>
            <div className='row'>
               <button type='submit'>Login</button>
               <Link to="/forgotPassword">Forgot Password ?</Link>
            </div>
        </form>
        <p>Don't have an account ? <Link to="/register">Register Now</Link></p>
    </div>
  )
}

export default Login
