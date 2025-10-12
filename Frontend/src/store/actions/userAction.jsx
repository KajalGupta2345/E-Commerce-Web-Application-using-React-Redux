import axios from "../../api/axiosconfig";
import { loaduser, removeuser } from "../reducers/userSlice";

export const asyncCurrentUser = () => async (dispatch, getState) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) dispatch(loaduser(user));
    else console.log("User not logged in");
  } catch (error) {
    console.log(error);
  }
};

export const asyncLoginUser = (user) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      `/users?username=${encodeURIComponent(user.username)}&password=${encodeURIComponent(user.password)}`
    );
    localStorage.setItem("user", JSON.stringify(data[0]));
    dispatch(asyncCurrentUser());
  } catch (error) {
    console.log(error);
  }
};
export const asyncLogoutUser = () => async (dispatch, getState) => {
  try {
    localStorage.removeItem("user");
    dispatch(removeuser());
  } catch (error) {
    console.log(error);
  }
};

export const asyncRegisterUser = (user) => async (dispatch, getState) => {
  try {
    // console.log(getState());

    const { data } = await axios.post("/users", user);
    dispatch(loaduser(data));
    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const asyncupdateuser = (id, user) => async (dispatch, getState) => {
  try {
    const { data } = await axios.patch(`/users/${id}`, user);
    localStorage.setItem("user", JSON.stringify(data));
    dispatch(asyncCurrentUser());
  } catch (error) {
    console.log(error);
  }
};
export const asyncdeleteuser = (id) => async (dispatch, getState) => {
  try {
    await axios.delete(`/users/${id}`);
    dispatch(asyncLogoutUser());
  } catch (error) {
    console.log(error);
  }
};

// ...email varify

export const asyncdoublemail = (user) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/users?email=${user.email}`);
    // console.log(data.length);
    
    if (data.length > 0) return true;
    else return false;
  } catch (error) {
    console.log(error);
  }
};
