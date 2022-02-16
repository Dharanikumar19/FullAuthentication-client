import React from 'react'
import { Routes, Route, Navigate} from "react-router-dom";
import Login from './Auth/Login';
import Register from './Auth/Register';
import Header from "../Header/Header";
import ForgotPassword from './Auth/ForgotPassword';
import ResetPassword from "./Auth/ResetPassword";

function Body() {

  const user = localStorage.getItem("token");

  return (
    <section>
      <Routes>
        {user &&  <Route path='/' exact element={<Header/>}></Route>}
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path='/login' exact element={<Login/>}></Route>
        <Route path='/register' exact element={<Register/>}></Route>
        <Route path='/forgotPassword' exact element={<ForgotPassword/>}></Route>
        <Route path='/user/resetPassword/:token' exact element={<ResetPassword/>}></Route>
       
      </Routes>
    </section>
  )
}

export default Body
