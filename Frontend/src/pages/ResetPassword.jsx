import { useForm } from "react-hook-form";
import axios from "../api/axiosconfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loaduser } from "../store/reducers/userSlice";

const ResetPassword = () => {
  const { register, reset, handleSubmit,formState:{errors} } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("resetUser"));

  const ResetHandler = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const {data1} = await axios.patch(`/users/${user[0].id}`, { password: data.newPassword });
      alert("Password updated successfully!");
      localStorage.removeItem("resetUser");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Try again!");
    }
    reset({ newPassword: "", confirmPassword: "" });
  };

  return (
    <form
      onSubmit={handleSubmit(ResetHandler)}
      className="flex flex-col items-center justify-center gap-y-5 w-1/2 p-5 rounded mx-auto bg-gray-50"
    >
      <h1 className="text-4xl font-black text-center text-gray-600">
        Reset Your Password 🔒
      </h1>

      <input
        type="password"
        className="outline-none border-b-2 border-blue-400 text-xl text-gray-500 px-3 py-2 w-1/2 focus:border-blue-600 transition-all"
        placeholder="Enter new password"
        {...register("newPassword", { required: "password cannot be empty!" })}
      />
      {errors.newPassword && (
        <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
      )}

      <input
        type="password"
        className="outline-none border-b-2 border-blue-400 text-xl text-gray-500 px-3 py-2 w-1/2 focus:border-blue-600 transition-all"
        placeholder="Confirm new password"
        {...register("confirmPassword", {
          required: "password cannot be empty!",
        })}
      />
      {errors.confirmPassword && (
        <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
      )}

      <button
        type="submit"
        className="text-white bg-blue-500 px-6 py-3 text-xl rounded-lg hover:bg-blue-600 transition-all"
      >
        Change Password
      </button>
    </form>
  );
};

export default ResetPassword;
