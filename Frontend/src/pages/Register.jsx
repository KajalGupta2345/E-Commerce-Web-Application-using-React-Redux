import { nanoid } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { asyncdoublemail, asyncRegisterUser } from "../store/actions/userAction";
import { useDispatch } from "react-redux";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showpassword, setshowpassword] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const RegisterHandler = async(user) => {
    const bol = await dispatch(asyncdoublemail(user));
    // console.log(bol);
    
    if (bol) {
      toast.error("Email already exists");
    } else {
      let base64Image = "";
      if (imageFile) {
        base64Image = await convertToBase64(imageFile);
      }

      const newUser = {
        ...user,
        id: nanoid(),
        isAdmin: false,
        image: base64Image,
        cart: [],
      };

      dispatch(asyncRegisterUser(newUser));
      toast.success("User Registered Successfully!");
      navigate("/login");
    }

    reset();
  };
  // console.log(errors);

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center rounded justify-center bg-[url('https://images.unsplash.com/photo-1675020007254-eaa81f584161?q=80&w=1025&auto=format&fit=crop')] bg-cover bg-center gap-8 p-4 md:p-10">
      {/* Left Side - Welcome Text */}
      <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
        <h1 className="text-2xl sm:text-4xl md:text-7xl font-bold text-white mb-4">
          Welcome to Our Platform
        </h1>
        <p className="text-white text-sm sm:text-base md:text-xl leading-relaxed">
          Join us and start your journey today! Access amazing features and
          connect with others.
        </p>
      </div>

      {/* Right Side - Register Form */}
      <form
        onSubmit={handleSubmit(RegisterHandler)}
        className="w-full max-w-md bg-white backdrop-blur-md border border-gray-100 rounded-2xl p-6 md:p-8 flex flex-col gap-4"
      >
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800">
            Create an account
          </h1>
          <p className="text-xs sm:text-sm md:text-base mt-1 text-center text-gray-500">
            Start your journey with us
          </p>
        </div>

        <input
          type="file"
          className="outline-none px-4 py-3 rounded-lg text-gray-500 md:text-lg sm:text-base text-sm focus:ring-2 focus:ring-blue-400 bg-blue-50 w-full"
          {...register("image")}
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        <input
          type="text"
          placeholder="John-Doe"
          className="outline-none px-4 py-3 rounded-lg text-gray-900 md:text-lg sm:text-base text-sm focus:ring-2 focus:ring-blue-400 bg-blue-50 w-full"
          {...register("username", { required: "username must be entered!" })}
        />
        {errors.username && (
          <p className="text-red-500 text-sm ">{errors.username.message}</p>
        )}

        <input
          type="email"
          placeholder="JohnDoe@gmail.com"
          className="outline-none px-4 py-3 rounded-lg text-gray-900 md:text-lg sm:text-base text-sm focus:ring-2 focus:ring-blue-400 bg-blue-50 w-full"
          {...register("email", { required: "email must be entered!" })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <div className="relative">
          <input
            type={showpassword ? "text" : "password"}
            placeholder="*********"
            className="outline-none px-4 py-3 rounded-lg text-gray-900 md:text-lg sm:text-base text-sm focus:ring-2 focus:ring-blue-400 bg-blue-50 w-full"
            {...register("password", { required: "password must be entered!" })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 md:text-lg sm:text-base text-sm hover:text-gray-700"
            onClick={() => setshowpassword(!showpassword)}
          >
            {showpassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            className="w-4 h-4 accent-blue-500 mt-1 cursor-pointer md:text-lg sm:text-base text-sm"
            {...register("checkbox", {
              required: "please accept the terms...",
            })}
          />
          <label className="text-gray-600 text-sm cursor-pointer">
            I agree to the{" "}
            <span className="text-blue-500 hover:underline md:text-medium sm:text-base text-sm">
              terms of service
            </span>{" "}
            &{" "}
            <span className="text-blue-500 hover:underline md:text-medium sm:text-base text-sm">
              privacy policy
            </span>
            {errors.checkbox && (
              <p className="text-red-500 text-sm mt-1">
                {errors.checkbox.message}
              </p>
            )}
          </label>
        </div>

        <button className="bg-blue-600 text-white py-3 w-full rounded-lg md:text-lg sm:text-base text-sm hover:bg-blue-700 transition-all">
          Create account
        </button>

        <p className="text-center text-gray-600 mt-2 md:text-lg sm:text-base text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
