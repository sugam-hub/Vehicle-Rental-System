import React, { useState } from "react";
import "./login.css";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const setValue = (e) => {
    const { name, value } = e.target;

    setInputValue(() => {
      return {
        ...inputValue,
        [name]: value,
      };
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    const { email, password } = inputValue;

    if (email === "") {
      alert("Please enter your email.");
    } else if (!email.includes("@")) {
      alert("Please enter valid email.");
    } else if (password === "") {
      alert("Please enter your password.");
    } else if (password.length < 8) {
      alert("Password must be longer than 8 character.");
    } else {
      // console.log("Login successful...");
      try {
        const data = await axios.post(
          "http://localhost:5000/api/auth/login",
          inputValue
        );
        // alert("logged in");

        const result = await data.data; //returns data ie. payload
        console.log(result);
        const res = await data.status;
        console.log(res);
        if (res === 200) {
          setInputValue({
            ...inputValue,
            email: "",
            password: "",
          });
          navigate("/");
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
            <h1>Welcome Back, Log In</h1>
            <p>Hi, we are glad you are back. Please login.</p>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
                value={inputValue.email}
                onChange={setValue}
              />
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!showPassword ? "password" : "text"}
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={inputValue.password}
                  onChange={setValue}
                />
                <div
                  className="showpass"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {!showPassword ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn" onClick={loginUser}>
              Login
            </button>
            <p>
              Don't have an Account?{" "}
              <NavLink to="/register" style={{ textDecoration: "none" }}>
                Sign Up
              </NavLink>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
