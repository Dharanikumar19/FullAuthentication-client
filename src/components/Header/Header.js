import axios from 'axios'
import React from 'react'
import { Link,useNavigate } from 'react-router-dom'

function Header() {

  const navigate = useNavigate()


  const handleLogout = async () => {
    try {
      await axios.get('/user/logout')
      localStorage.removeItem('token')
      navigate("/login")
    } catch (err) {
      navigate("/login")
    }
  }

  return (
    <>
      <header>
        <div>
          <h1>New Website</h1>
        </div>
        <ul>
          <li><Link to="/login" onClick={handleLogout}><i className='fas fa-user'> Logout</i></Link></li>
        </ul>
      </header>
      <h2>Login Succesfull!!!</h2>
    </>


  )
}

export default Header
