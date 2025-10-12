import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosconfig";
import Login from "./Login";

const ForgotPassword = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }, 
  } = useForm();
  const navigate = useNavigate();

  const ResetHandler = async (formData) => {
    try {
      console.log("Email entered:", formData.email);
      const { data } = await axios.get(`/users?email=${formData.email}`);
        console.log(data);
        

      localStorage.setItem("resetUser", JSON.stringify(data));

      if (data.length == 0) {
        alert("Email not found! Please enter a registered email.");
        return;
      }
      navigate("/reset/password");
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(ResetHandler)}
      className="flex flex-col items-center justify-center gap-y-5 rounded mx-auto p-5 w-1/2 bg-gray-50"
    >
      <h1 className="text-4xl font-black text-center text-gray-600">
        Forgot Password?
      </h1>

      <input
        className="outline-none border-b-2 border-blue-400 text-gray-500 text-xl px-3 py-2 w-1/2 focus:border-blue-600 transition-all"
        type="email"
        placeholder="Enter your email"
        {...register("email", { required: "email cannot be blank" })}
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      <button
        type="submit"
        className="text-white bg-blue-500 px-6 py-3 text-xl rounded-lg hover:bg-blue-600 transition-all"
      >
        Send Reset Link
      </button>
    </form>
  );
};

export default ForgotPassword;
