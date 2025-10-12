import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthWrapper = ({ children }) => {
  const { users } = useSelector((state) => state.userReducer);
  console.log(users);
  let bol = (users == null);
  console.log(bol)

  return !bol ? children : <Navigate to="/login" />;
};

export default AuthWrapper;



// const AuthWrapper = ({ children }) => {
//   const { users } = useSelector((state) => state.userReducer);

//   const isLoggedIn = users && Object.keys(users).length > 0;

//   return isLoggedIn ? children : <Navigate to="/login" />;
// };

// export default AuthWrapper;
