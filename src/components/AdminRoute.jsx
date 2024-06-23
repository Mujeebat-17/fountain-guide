import { Outlet, useLocation, Navigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const AdminRoute = () => {
  const location = useLocation();

    const fetchCurrentUser = async () => {
      const user = auth.currentUser;
      const docRef = doc(db, "users", user.uid);

      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            if (userData.is_admin === true) {
              return true
            }
          }
        })
        .catch((e) => {
          console.error("Error fetching user role: ", e);
          return false
        });
    };


  return fetchCurrentUser() ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default AdminRoute;
