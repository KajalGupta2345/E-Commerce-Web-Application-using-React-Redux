import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UnauthWrapper = ({children}) => {
  const { users } = useSelector((state) => state.userReducer);
  console.log(users);
  
  let bol = (users == null);
  return bol ? children : <Navigate to="/" />;
};



// const UnauthWrapper = ({ children }) => {
//   const { users } = useSelector((state) => state.userReducer);
//   const isLoggedIn = users && Object.keys(users).length > 0;

//   return !isLoggedIn ? children : <Navigate to="/" />;
// };


export default UnauthWrapper;