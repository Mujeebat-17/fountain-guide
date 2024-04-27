import "./Sstyles.css";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, useLocation } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // replace the login route in the stack
  const from = location.state?.from?.pathname || "/dashboard";

  const onLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem("authUser", JSON.stringify(user))

        navigate(from, { replace: true });
        setEmail("");
        setPassword("");
        console.log("Success", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
      
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="header">
          <div className="text">Sign In</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <i className="fa-solid fa-email"></i>
            <input type="email" placeholder="Email id" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input">
            <i className="fa-solid fa-password"></i>
            <input type="password" placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)} />
          </div>
        </div>
        <div className="forgot-password">
          Don&apos;t have an account?
          <a href="register">
            <span> Register!</span>
          </a>
        </div>
        <div className="submit-container">
        <button type="submit" onClick={onLogin} className="submit">Login</button>
        </div>
      </div>
    </>
  );
}
export default SignIn;
