import "./styles.css";
import Home from "./routes/Home";
import Location from "./routes/Location";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./routes/SignIn";
import FeedbackPage from "./routes/feedback"
import Register from "./routes/Register";
import Admin from "./routes/Admin";
import PrivateRoutesLayout from "./components/PrivateRoutesLayout";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter basename="/fountain-guide/">
      <Routes>
        {/* public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />

        <Route path="*" element={<div> Page Not Found </div>} />

        {/* private routes */}
        <Route element={<PrivateRoutesLayout />}>
        <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/location" element={<Location />} />
          <Route path="/" element={<Home />} />
        </Route>

        {/* admin route */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        
      </Routes>
    </BrowserRouter>

  );
}

export default App;
