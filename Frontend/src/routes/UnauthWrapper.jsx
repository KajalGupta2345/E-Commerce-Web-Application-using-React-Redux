import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UnauthWrapper = ({children}) => {
  const { users } = useSelector((state) => state.userReducer);
  // console.log(users);
  
  const isLoggedIn = users && Object.keys(users).length  > 0;
  // console.log(Object.keys(users).length );

  return !isLoggedIn ? children : <Navigate to="/" />;
};

export default UnauthWrapper; 