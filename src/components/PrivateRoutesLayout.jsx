
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { auth } from "../firebase";

const PrivateRoutesLayout = () => {
  const location = useLocation();
  const currentUser = () => {
    let cu = null
    if (!auth.currentUser){
        cu = localStorage.getItem("authUser");
    }
    else{
        cu = auth.currentUser
    }
    return true //cu
   };

  return currentUser() ? (
    <Outlet />
  ) : (
    // keep the previous navigation stack
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default PrivateRoutesLayout;
