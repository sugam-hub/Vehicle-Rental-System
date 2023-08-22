import axios from "axios";
import { message } from "antd";

export const userLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      reqObj
    );
    console.log(response.data);
    localStorage.setItem("user", JSON.stringify(response.data));
    message.success("Login Success");
    dispatch({ type: "LOADING", payload: false });
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  } catch (err) {
    message.error("Wrong Credentials");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const userRegister = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const obj = reqObj;
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      reqObj
    );
    message.success("Register Successful");
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);
    dispatch({ type: "LOADING", payload: false });
  } catch (err) {
    message.error("Please check for valid email and password");
    dispatch({ type: "LOADING", payload: false });
  }
};

//GET ALL USERS
export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.get(
      "http://localhost:5000/api/auth/getallusers"
    );
    dispatch({ type: "GET_ALL_USERS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (err) {
    dispatch({ type: "LOADING", payload: false });
  }
};

//DELETE USER
export const deleteUser = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    await axios.post("http://localhost:5000/api/auth/deleteuser", reqObj);
    message.success("User deleted successfully...");
    setTimeout(() => {
      window.location.reload();
    }, 500);
    dispatch({ type: "LOADING", payload: false });
  } catch (err) {
    dispatch({ type: "LOADING", payload: false });
  }
};

//EDIT USER
export const editUser = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.put(
      `http://localhost:5000/api/auth/edituser/${reqObj.userid}`,
      reqObj
    );
    message.success("User details updated  successfully...");
    setTimeout(() => {
      window.location.href = "/profile";
    }, 500);
    dispatch({ type: "LOADING", payload: false });
  } catch (err) {
    dispatch({ type: "LOADING", payload: false });
  }
};

// EDIT USER BY ADMIN
export const editUserByAdmin = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.put(
      `http://localhost:5000/api/auth/edituser/${reqObj.userid}`,
      reqObj
    );
    message.success("User details updated  successfully...");
    setTimeout(() => {
      window.location.href = "/users";
    }, 500);
    dispatch({ type: "LOADING", payload: false });
  } catch (err) {
    dispatch({ type: "LOADING", payload: false });
  }
};
