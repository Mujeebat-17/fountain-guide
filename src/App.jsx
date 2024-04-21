import "./styles.css";
import Home from "./routes/Home";
import Location from "./routes/Location";
import {Route, Routes } from "react-router-dom";
import SignUp from "./routes/SignUp";
import S from "./routes/S";
 function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/> 
        <Route path="/location" element={<Location/>}/>
        <Route path="/register" element={<S/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      
      </Routes>
      
      {/* <footer className="footer">
                <p className="text-footer">
                    Copyright ©-All rights are reserved
                </p>
            </footer> */}
    </div>
  );
}

export default App