const initialData = {
  nearestVehicles: [],
};

export const nearestVehiclesReducer = (state = initialData, action) => {
  switch (action.type) {
    case "GET_ALL_CARS": {
      return {
        ...state,
        nearestVehicles: action.payload,
      };
    }
    default:
      return state;
  }
};
