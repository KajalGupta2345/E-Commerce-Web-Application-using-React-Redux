import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { asyncLoginUser } from "../store/actions/userAction";
import { useDispatch } from "react-redux";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Login = () => {
  const { register, reset, handleSubmit } = useForm();
  const [showpassword, setshowpassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LoginHandler = (user) => {
    dispatch(asyncLoginUser(user));
    navigate("/");
    reset();
  };

  return (
    <div className="flex flex-col md:flex-row h-screen rounded w-full gap-8 bg-[url('https://images.unsplash.com/photo-1664265694638-e858db3fd16b?q=80&w=1170&auto=format&fit=crop')] bg-cover bg-center justify-center items-center px-4 md:px-10">
      
      {/* Left Side */}
      <div className="text-center md:text-left md:w-1/2 mb-8 md:mb-0">
        <h1 className="text-2xl sm:text-4xl md:text-7xl font-extrabold text-blue-700">
          Welcome Back!
        </h1>
        <p className="text-sm sm:text-base md:text-xl  mt-4 text-gray-700 leading-relaxed">
          We missed you. Log in to pick up right where you left off 🚀
        </p>
      </div>

      {/* Right Side - Login Form */}
      <form
        onSubmit={handleSubmit(LoginHandler)}
        className="relative z-10 w-full max-w-md bg-white backdrop-blur-md border border-gray-200 rounded-2xl p-8 md:p-10 flex flex-col gap-y-6"
      >
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800">
            Login to your account
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-center mt-1 text-gray-500">
            Enter your account details
          </p>
        </div>

        <input
          type="text"
          className="outline-none px-4 py-3 rounded-lg md:text-lg sm:text-base text-sm focus:ring-2 text-gray-900 bg-blue-50 focus:ring-blue-400 w-full"
          placeholder="John-Doe"
          {...register("username", { required: true })}
        />

        <div className="w-full relative">
          <input
            type={showpassword ? "text" : "password"}
            className="outline-none px-4 py-3 rounded-lg md:text-lg sm:text-base text-sm focus:ring-2 text-gray-900 bg-blue-50 focus:ring-blue-400 w-full"
            placeholder="*********"
            {...register("password", { required: true })}
          />
          <button
            type="button"
            className="absolute text-gray-500 hover:text-gray-600 flex md:text-lg sm:text-base text-sm items-center right-3 inset-y-0"
            onClick={() => setshowpassword(!showpassword)}
          >
            {showpassword ? (
              <EyeSlashIcon className="w-6 h-6" />
            ) : (
              <EyeIcon className="w-6 h-6" />
            )}
          </button>
        </div>

        <Link
          to="/forgot/password"
          className="text-blue-500 text-sm hover:underline"
        >
          Forgot Password?
        </Link>

        <button className="cursor-pointer text-white w-full bg-blue-600 px-4 py-3 hover:bg-blue-700 md:text-lg sm:text-base text-sm rounded-lg transition-all">
          Login
        </button>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?
          <Link
            to="/register"
            className="text-blue-500 font-medium hover:underline ml-1"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

