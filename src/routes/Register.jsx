import "./Sstyles.css";
import Navbar from "../components/Navbar";
import { useState } from "react";
import {createUserWithEmailAndPassword }from "firebase/auth";
function Register (){
    return(
        <>
         <Navbar/>
        <div className="container">

          <div className="header">
            <div className="text">Register</div>
            <div className="underline"></div>
          </div>
          <div className="inputs">
            <div className="input">
              <i class="fa-solid fa-input"></i>
              <input type="text" placeholder="Name"/>
            </div>
            <div className="input">
              <i class="fa-solid fa-email"></i>
              <input type="email" placeholder="Email id"/>
            </div>
            <div className="input">
              <i class="fa-solid fa-password"></i>
              <input type="password" placeholder="Password"/>
            </div>
          </div>
          <div className="forgot-password">Already have an account?<a href="signin"><span>Sign In!</span></a></div>
          <div className="submit-container">
          <div className="submit">Register</div>
          </div>
        </div>
        </>
    );
}
export default Register;