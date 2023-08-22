import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { vehiclesReducer } from "./reducers/vehiclesReducer";
import { alertsReducer } from "./reducers/alertsReducer";
import { bookingsReducer } from "./reducers/bookingsReducer";
import { searchReducer } from "./reducers/searchReducer";
import { usersReducer } from "./reducers/usersReducer";
import { nearestVehiclesReducer } from "./reducers/nearestVehiclesReducer";

const composeEnhancers = composeWithDevTools({});
const rootReducer = combineReducers({
  vehiclesReducer,
  alertsReducer,
  bookingsReducer,
  searchReducer,
  usersReducer,
  nearestVehiclesReducer,
});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
