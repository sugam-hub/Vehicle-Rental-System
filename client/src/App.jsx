import React, { useState } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import BookingVehicle from "./pages/BookingVehicle/BookingVehicle";
import Main from "./pages/Main/Main";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import UserBookings from "./pages/UserBookings/UserBookings";
import AddCar from "./pages/AddCar/AddCar";
import AdminHome from "./pages/Admin/AdminHome";
import EditCar from "./pages/EditCar/EditCar";
import Address from "./components/Address/Address";
import Notification from "./pages/Notification/Notification";

import Users from "./pages/Users/Users";
import UserProfile from "./pages/UserProfile/UserProfile";

const App = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const [isAdmin, setIsAdmin] = useState(false);

  // setIsAdmin(user.otherInfo.isAdmin);

  return (
    <>
      {/* <Header /> */}

      {isAdmin ? (
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/users" exact element={<Users />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
          </Routes>
        </Router>
      ) : (
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
            <Route
              path="booking/*"
              element={<ProtectedRoute></ProtectedRoute>}
            />
            <Route path="/booking/:carid" element={<BookingVehicle />} />
            <Route path="/booking/userbookings" element={<UserBookings />} />
            <Route path="/addcar" element={<AddCar />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/editcar/:carid" element={<EditCar />} />
            <Route path="/address" element={<Address />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </Router>
      )}
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
