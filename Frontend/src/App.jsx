import { useEffect } from "react";
import { asyncCurrentUser } from "./store/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import MainRoutes from "./routes/MainRoutes";
import Nav from "./components/Nav";

const App = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (!users || users.length === 0) {
      console.log("No user found, loading current user...");
      dispatch(asyncCurrentUser());
    }
  }, [users]);

  useEffect(()=>{
    document.title = "E-Commerce Website"
  },[])

  return (
    <div className="bg-gray-900 border-[5px] border-blue-400 rounded p-10 text-white  w-full flex flex-col gap-y-8">
      <Nav />
      <MainRoutes />
    </div>
  );
};

export default App;
