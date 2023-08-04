const initialState = {
  loading: false,
  searchResults: [],
  error: false,
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_LOADING":
      return { ...state, loading: true, error: false };

    case "SEARCH_SUCCESS":
      return {
        ...state,
        loading: false,
        searchResults: action.payload,
        error: false,
      };

    case "SEARCH_FAILURE":
      return { ...state, loading: false, searchResults: [], error: true };

    default:
      return state;
  }
};
