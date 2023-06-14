import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { vehiclesReducer } from "./reducers/vehiclesReducer";
import { alertsReducer } from "./reducers/alertsReducer";
import { bookingsReducer } from "./reducers/bookingsReducer";

const composeEnhancers = composeWithDevTools({});
const rootReducer = combineReducers({
  vehiclesReducer,
  alertsReducer,
  bookingsReducer,
});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
