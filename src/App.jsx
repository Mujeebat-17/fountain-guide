import "./styles.css";
import Home from "./routes/Home";
import Location from "./routes/Location";
import {Route, Routes } from "react-router-dom";
import SignIn from "./routes/SignIn";
import Register from "./routes/Register";
 function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/> 
        <Route path="/location" element={<Location/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/signin" element={<SignIn/>}/>
      
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