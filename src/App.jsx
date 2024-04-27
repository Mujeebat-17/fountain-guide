import "./styles.css";
import Home from "./routes/Home";
import Location from "./routes/Location";
import {Route, Routes } from "react-router-dom";
import SignIn from "./routes/SignIn";
import Register from "./routes/Register";
import PrivateRoutesLayout from "./components/PrivateRoutesLayout";

function App() {
  return (
    <div className="App">
    <Routes>
      {/* public routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="*" element={<div> Page Not Found </div>} />

      {/* private routes */}
      <Route element={<PrivateRoutesLayout />}>
        <Route path="/location" element={<Location />} />
        <Route path="/" element={<Home />} />
      </Route>
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