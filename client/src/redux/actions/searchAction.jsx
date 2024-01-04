import axios from "axios";

export const getAllSearch = (searchQuery) => async (dispatch) => {
  dispatch({ type: "SEARCH_LOADING" });

  try {
    const response = await axios.get("http://localhost:5000/api/auth/search", {
      params: { search: searchQuery },
    });

    if (response.data.success) {
      dispatch({ type: "SEARCH_SUCCESS", payload: response.data.data });
    } else {
      dispatch({ type: "SEARCH_FAILURE" });
    }
  } catch (err) {
    dispatch({ type: "SEARCH_FAILURE" });
  }
};
