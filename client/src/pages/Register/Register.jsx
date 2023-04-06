import React, { useState } from "react";
import "./register.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const setValue = (e) => {
    const { name, value } = e.target;

    setInputValue(() => {
      return {
        ...inputValue,
        [name]: value,
      };
    });
  };

  const addUserData = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = inputValue;

    if (name === "") {
      alert("Please enter your name.");
    } else if (email === "") {
      alert("Please enter your email.");
    } else if (!email.includes("@")) {
      alert("Please enter valid email.");
    } else if (password === "") {
      alert("Please enter your password.");
    } else if (password.length < 8) {
      alert("Password must be longer than 8 character.");
    } else if (confirmPassword === "") {
      alert("Please confirm your password.");
    } else if (confirmPassword.length < 8) {
      alert("Password must be longer than 8 character.");
    } else if (password !== confirmPassword) {
      alert("Password and ConfirmPassword don't match.");
    } else {
      // console.log("User registration successful...");
      try {
        const data = await axios.post(
          "http://localhost:5000/api/auth/register",
          inputValue
        );
        const result = await data.data; //returns data ie. payload
        console.log(result);
        const res = await data.status;
        console.log(res);

        if (res === 200) {
          alert("User successfully registered.");
          setInputValue({
            ...inputValue,
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
            <p style={{ textAlign: "center" }}>
              We are glad that you will be using Sugam. to manage
              <br /> your tasks! We hope that you will like it.
            </p>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your full name"
                onChange={setValue}
                value={inputValue.name}
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
                onChange={setValue}
                value={inputValue.email}
              />
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!showPassword ? "password" : "text"}
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  onChange={setValue}
                  value={inputValue.password}
                />
                <div
                  className="showpass"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {!showPassword ? "Show" : "Hide"}
                </div>
              </div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="two">
                <input
                  type={!showConfirmPassword ? "password" : "text"}
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  onChange={setValue}
                  value={inputValue.confirmPassword}
                />
                <div
                  className="showpass"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {!showConfirmPassword ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn" onClick={addUserData}>
              Sign Up
            </button>
            <p>
              Already Sign Up?{" "}
              <NavLink to="/login" style={{ textDecoration: "none" }}>
                Login
              </NavLink>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
