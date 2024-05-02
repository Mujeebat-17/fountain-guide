
import "./Sstyles.css";
import Navbar from "../components/Navbar";
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Register() {  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/signin";

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem("authUser", JSON.parse(user))

        navigate(from, { replace: true });
        setEmail("");
        setPassword("");
        console.log("Success", user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  return (
    <>
      <Navbar />
      <div className="container">

        <div className="header">
          <div className="text">Register</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          <div className="input">
            <i className="fa-solid fa-input"></i>
            <input type="text" placeholder="Name" />
          </div>
          <div className="input">
            <i className="fa-solid fa-email"></i>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input">
            <i className="fa-solid fa-password"></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="forgot-password">
          Already have an account?
          <a href="signin">
            <span>Sign In!</span>
          </a>
        </div>
        <div className="submit-container">
          <button type="submit" onClick={onSubmit} className="submit">Register</button>
        </div>
      </div>
    </>
  );
}
export default Register;
