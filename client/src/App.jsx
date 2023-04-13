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
} from "react-router-dom";

const App = () => {
  return (
    <>
      {/* <Header /> */}
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="book" element={<BookingVehicle />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
