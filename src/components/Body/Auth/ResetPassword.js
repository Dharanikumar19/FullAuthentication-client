import React, { useState } from 'react'
import axios from 'axios'
import { useParams,useNavigate } from 'react-router-dom'
import { showErrMsg, showSuccessMsg } from '../../utils/Notification'


const initialState = {
    password: '',
    confirm_password: '',
    err: '',
    success: ''
}

function ResetPassword() {
    const [data, setData] = useState(initialState)
    const {token} = useParams()
    const navigate = useNavigate()

    const { password, confirm_password, err, success } = data

    const handleChangeInput = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, err: '', success: '' })
    }

    const isLength = password => {
        if (password.length < 6) return true
        return false
    }

    const isMatch = (password, confirm_password) => {
        if (password === confirm_password) return true
        return false
    }

    const handleResetPass = async () => {

        if (isLength(password))
            return setData({ ...data, err: "Password must be at least 6 characters", success: '' })

        if (!isMatch(password, confirm_password))
            return setData({ ...data, err: "Password did not match", success: '' })

        try {
            const res = await axios.post('https://authentication-flow.herokuapp.com/user/resetPassword', {password}, {              
                headers: { Authorization: token }
            })
            setTimeout(() => {
                navigate('/login')
              }, 1000)
            return setData({ ...data, err: "", success: res.data.msg })
           

        } catch (err) {
            err.response.data.msg && setData({ ...data, err: err.response.data.msg, success: '' })
        }

    }


    return (
        <div className="fg_pass">
            <h2>Reset Your Password</h2>

            <div className="row">
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password}
                    onChange={handleChangeInput} />

                <label htmlFor="confirm_password">Confirm Password</label>
                <input type="password" name="confirm_password" id="confirm_password" value={confirm_password}
                    onChange={handleChangeInput} />

                <button type='submit' onClick={handleResetPass}>Reset Password</button>
            </div>
        </div>
    )
}

export default ResetPassword