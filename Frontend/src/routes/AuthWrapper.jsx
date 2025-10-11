import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthWrapper = ({ children }) => {
  const { users } = useSelector((state) => state.userReducer);
  console.log(Object.keys(users).length);

  const isLoggedIn = users && Object.keys(users).length > 0;

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default AuthWrapper;
