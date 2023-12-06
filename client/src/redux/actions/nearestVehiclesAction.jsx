import axios from "axios";

export const nearestVehicle = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.post("http://localhost:5000/api/auth/nearestvehicles", reqObj);
    if (response.data) {
      dispatch({ type: "GET_NEAREST_VEHICLES", payload: response.data });
    }
    dispatch({ type: "LOADING", payload: false });
  } catch (err) {
    dispatch({ type: "LOADING", payload: false });
  }
};