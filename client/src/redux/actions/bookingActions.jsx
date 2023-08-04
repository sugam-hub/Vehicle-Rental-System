import axios from "axios";
import { message } from "antd";

export const bookCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("http://localhost:5000/api/auth/bookcar", reqObj);
    dispatch({ type: "LOADING", payload: false });
    message.success("Your car booked successfully");
    setTimeout(() => {
      window.location.href("/userbookings");
    }, 500);
  } catch (err) {
    dispatch({ type: "LOADING", payload: false });
    message.error("Something went wrong, please try later");
  }
};

//ACCEPTED CAR STATUS
export const carStatusAccepted = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("http://localhost:5000/api/auth/status", reqObj);
    dispatch({ type: "LOADING", payload: false });
    // console.log(data);
    message.success("You ACCEPTED the booking");
    setTimeout(() => {
      window.location.href("/userbookings");
    }, 500);
  } catch (err) {
    dispatch({ type: "LOADING", payload: false });
    message.error("Something went wrong, please try later");
  }
};

// REJECTED CAR STATUS
export const carStatusRejected = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("http://localhost:5000/api/auth/status", reqObj);
    dispatch({ type: "LOADING", payload: false });
    message.success("You REJECTED the booking");
    setTimeout(() => {
      window.location.href("/userbookings");
    }, 500);
  } catch (err) {
    dispatch({ type: "LOADING", payload: false });
    message.error("Something went wrong, please try later");
  }
};

//Get All Bookings
export const getAllBookings = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.get(
      "http://localhost:5000/api/auth/getallbookings"
    );
    dispatch({ type: "GET_ALL_BOOKINGS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (err) {
    dispatch({ type: "LOADING", payload: false });
  }
};

//DELETE BOOKING
export const deleteBooking = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    await axios.post("http://localhost:5000/api/auth/deletebooking", reqObj);
    message.success("Booking deleted successfully...");
    setTimeout(() => {
      window.location.reload();
    }, 500);
    dispatch({ type: "LOADING", payload: false });
  } catch (err) {
    dispatch({ type: "LOADING", payload: false });
  }
};
