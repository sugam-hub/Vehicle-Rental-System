export const getAllSearch = (search) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.get(
      "http://localhost:5000/api/auth/search",
      search
    );
    dispatch({ type: "SEARCH_SUCCESS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (err) {
    dispatch({ type: "LOADING", payload: false });
  }
};
