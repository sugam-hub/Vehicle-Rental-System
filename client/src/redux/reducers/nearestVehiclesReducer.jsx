const initialData = {
  nearestVehicles: [],
};

export const nearestVehiclesReducer = (state = initialData, action) => {
  switch (action.type) {
    case "GET_NEAREST_VEHICLES": {
      return {
        ...state,
        nearestVehicles: action.payload,
      };
    }
    default:
      return state;
  }
};
