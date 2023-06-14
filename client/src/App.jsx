import React from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import BookingVehicle from "./pages/BookingVehicle/BookingVehicle";
import Header from "./components/Header/Header";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import UserBookings from "./pages/UserBookings/UserBookings";
import AddCar from "./pages/AddCar/AddCar";
import AdminHome from "./pages/Admin/AdminHome";
import EditCar from "./pages/EditCar/EditCar";

const App = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {/* <Header /> */}
      <Router>
        <Routes>
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Route path="/" element={<Home />} />
              </ProtectedRoute>
            }
          />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="booking" element={<ProtectedRoute></ProtectedRoute>} />
          <Route path="/booking/:carid" element={<BookingVehicle />} />
          <Route path="/booking/userbookings" element={<UserBookings />} />
          <Route path="/addcar" element={<AddCar />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/editcar/:carid" element={<EditCar />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;

export function ProtectedRoute(props) {
  if (localStorage.getItem("user")) {
    return (
      <Routes>
        <Route {...props} />;
      </Routes>
    );
  } else {
    return <Navigate replace to="/login" />;
  }
}
