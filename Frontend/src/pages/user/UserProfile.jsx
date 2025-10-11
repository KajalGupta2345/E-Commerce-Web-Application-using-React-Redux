import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncupdateuser } from "../../store/actions/userAction";
import { asyncLogoutUser } from "../../store/actions/userAction";
import { asyncdeleteuser } from "../../store/actions/userAction";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.userReducer);
  //   console.log(users);

  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    if (users) {
      reset({
        username: users?.username,
        email: users?.email,
        password: users?.password,
      });
    }
  }, [users, reset]);
  const UpdateUserHandler = (user) => {
    dispatch(asyncupdateuser(users.id, user));
  };
  const DeleteUserHandler = () => {
    dispatch(asyncdeleteuser(users.id));
    navigate("/login");
  };
  const LogoutUserHandler = () => {
    dispatch(asyncLogoutUser());
    navigate("/login");
  };

  return users ? (
    <div className="mt-10 flex flex-col gap-8 justify-stretch items-center md:flex-row p-6 md:p-10 bg-gray-200 rounded-lg ">
       <div className="w-full md:w-1/2 mx-auto p-8 bg-white  rounded-2xl shadow-lg flex flex-col  justify-center gap-5 items-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl  font-bold text-center text-gray-800">Profile</h1>
          <img
            className="w-30 h-30 md:w-40 md:h-40 border-blue-500 border-5 max-w-md object-contain rounded-full shadow-md hover:shadow-lg transition"
            src={users.image}
            alt={users.username}
          />
            <p className="text-xl sm:text-2xl md:text-3xl  font-semibold md:texr-4xl text-gray-700">
              Username : <span className="font-medium text-gray-900">{users.username}</span>
            </p>
            <p className="text-lg sm:text-xl md:text-2xl  font-medium  text-gray-600">
               Email : <span className="font-normal text-gray-800">{users.email}</span>
            </p>
        </div>
      <form
        onSubmit={handleSubmit(UpdateUserHandler)}
        className="flex flex-col w-full md:w-1/2 gap-5 bg-white mx-auto shadow-xl rounded-2xl p-8  "
      >
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl  font-bold text-center text-gray-800">
            Update Your Profile
          </h1>
        </div>
        <input
          type="text"
          className="outline-none px-4 py-3  rounded-lg text-sm sm:text-base md:text-lg lg:text-xl focus:ring-2 text-gray-900 bg-blue-50 focus:ring-blue-400 text-2xl w-full"
          placeholder="John-Doe"
          {...register("username")}
        />
        <input
          className="outline-none px-4 py-3  rounded-lg text-sm sm:text-base md:text-lg lg:text-xl focus:ring-2 text-gray-900 bg-blue-50 focus:ring-blue-400 text-2xl w-full"
          type="email"
          placeholder="John@gmail.com"
          {...register("email")}
        />
        <input
          type="password"
          className="outline-none px-4 py-3  rounded-lg text-sm sm:text-base md:text-lg lg:text-xl focus:ring-2 text-gray-900 bg-blue-50 focus:ring-blue-400 text-2xl w-full"
          placeholder="********"
          {...register("password")}
        />

        <div className="flex flex-col gap-5 lg:flex-row">
          <button
            className="cursor-pointer text-white w-full bg-blue-600 px-4 py-3 hover:bg-blue-700 text-sm sm:text-base md:text-lg lg:text-xl rounded-lg shadow-md tansition-all"
            type="submit"
          >
            Update User
          </button>
          <button
            onClick={LogoutUserHandler}
            type="button"
            className=" cursor-pointer text-white w-full mx-auto bg-red-500 px-4 py-3 hover:bg-red-600 text-sm sm:text-base md:text-lg lg:text-xl rounded-lg shadow-md tansition-all"
          >
            Logout User
          </button>
          <button
            onClick={DeleteUserHandler}
            type="button"
            className="cursor-pointer text-white w-full mx-auto bg-red-600 px-4 py-3 hover:bg-red-700 text-sm sm:text-base md:text-lg lg:text-xl rounded-lg shadow-md tansition-all"
          >
            Delete User
          </button>
        </div>
      </form>
    </div>
  ) : (
    <div className="flex justify-center items-center h-96 text-xl font-semibold">
      "Loading..."
    </div>
  );
};

export default UserProfile;
