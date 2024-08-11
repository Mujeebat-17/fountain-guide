import "./Sstyles.css";
import Navbar from "../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

function Register() {
      const [error, setError] = useState('');

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/signin";


  const onSubmit = async (e) => {
    e.preventDefault();


        // Password validation
        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(user, {
          phoneNumber: phoneNum,
          address: address,
        })
          .then(() => {
            console.log("Success", user);
            navigate(from, { replace: true });
            setEmail("");
            setPassword("");
          })
          .catch((error) => {
            console.log(error);
            setError(error.message);
          });

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError(errorMessage);
        // ..
      });
  };

  return (
    <>
      <Navbar />
      <div className="container">
      {error && <p style={{ color: 'red', fontWeight: 'bold', padding: '10px' }}>{error}</p>}
        <div className="header">
          <div className="text">Register</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          <div className="input">
            <i className="fa-solid fa-input"></i>
            <input type="text" placeholder="FullName" />
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
          <div className="input">
            <i className="fa-solid fa-password"></i>
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNum}
              onChange={(e) => setPhoneNum(e.target.value)}
            />
          </div>
          <div className="input">
            <i className="fa-solid fa-password"></i>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
          <button type="submit" onClick={onSubmit} className="submit">
            Register
          </button>
        </div>
      </div>
    </>
  );
}
export default Register;
