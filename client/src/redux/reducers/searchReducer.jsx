const initialData = {
  search: [],
};

export const searchReducer = (state = initialData, action) => {
  switch (action.type) {
    case "SEARCH": {
      return {
        ...state,
        search: action.payload,
      };
    }
    default:
      return state;
  }
};
