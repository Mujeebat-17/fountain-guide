import "./Sstyles.css";
import Navbar from "../components/Navbar";

function SignUp (){
    return(
        <>
     <Navbar/>
     <div className="container"> 

          <div className="header">
            <div className="text">Sign In</div>
            <div className="underline"></div>
          </div>
          <div className="inputs">

            <div className="input">
              <i class="fa-solid fa-email"></i>
              <input type="email" placeholder="Email id"/>
            </div>
            <div className="input">
              <i class="fa-solid fa-password"></i>
              <input type="password" placeholder="Password"/>
            </div>
          </div>
          <div className="forgot-password">Don't have an account?<a href="S"><span> Register!</span></a></div>
          <div className="submit-container">
          <div className="submit">Sign In</div>
          </div>
        </div>
      </>
    );
}
export default SignUp;