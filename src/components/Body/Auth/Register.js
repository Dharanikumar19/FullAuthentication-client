import axios from 'axios'
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { showErrMsg, showSuccessMsg } from "../../utils/Notification"

const initialState = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    err: "",
    success: ""
}

function Register() {
    const [user, setUser] = useState(initialState)
    const { name, email, password, confirm_password, err, success } = user
    const navigate = useNavigate()

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value, err: "", success: "" })
    }

    const isEmpty = value => {
        if (!value) return true
        return false
    }

    const isEmail = email => {
        // eslint-disable-next-line
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const isLength = password => {
        if (password.length < 6) return true
        return false
    }

    const isMatch = (password, confirm_password) => {
        if (password === confirm_password) return true
        return false
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if (isEmpty(name) || isEmpty(password))
            return setUser({ ...user, err: "Please fill all the fields", success: '' })

        if (!isEmail(email))
            return setUser({ ...user, err: "Invalid email", success: '' })

        if (isLength(password))
            return setUser({ ...user, err: "Password must be atleast 6 characters", success: '' })

        if (!isMatch(password, confirm_password))
            return setUser({ ...user, err: "Password and confirm password did not match", success: '' })

        try {
            const res = await axios.post('https://authentication-flow.herokuapp.com/user/register', {
                name, email, password
            })
            setUser({...user, err: '', success: res.data.msg})
            setTimeout(() => {
                navigate('/login')
              }, 3000)
        } catch (error) {
            error.response.data.msg &&
                setUser({ ...user, err: error.response.data.msg, success: "" })
        }
    }

    return (
        <div className='login_page' style={{marginTop:"100px"}}>
            <h2>Register</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input type="text" placeholder='Enter your name' id="name"
                        value={name} name="name" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor='email'>Email Address</label>
                    <input type="email" placeholder='Enter your email id' id="email" 
                        value={email} name="email" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor='password'>Password</label>
                    <input type="password" placeholder='Enter your password' id='password' 
                        value={password} name="password" onChange={handleChangeInput} />
                </div>
                <div>
                    <label htmlFor='confirm_password'>Confirm Password</label>
                    <input type="password" placeholder='Enter your confirm password' id='confirm_password' 
                        value={confirm_password} name="confirm_password" onChange={handleChangeInput} />
                </div>
                <div className='row'>
                    <button type='submit'>Register</button>
                </div>
            </form>
            <p>Already have an account ? <Link to="/login">Login Now</Link></p>
        </div>
    )
}

export default Register
