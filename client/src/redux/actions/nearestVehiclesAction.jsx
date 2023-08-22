import axios from "axios";

export const nearestVehicle = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    await axios.post("http://localhost:5000/api/auth/nearestvehicles", reqObj);
    dispatch({ type: "LOADING", payload: false });
  } catch (err) {
    dispatch({ type: "LOADING", payload: false });
  }
};
