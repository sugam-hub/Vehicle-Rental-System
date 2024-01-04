import React, { useState } from "react";
import { Row, Col, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/actions/userActions";

import Password from "antd/es/input/Password";

const Login = () => {

  const [showHidePassword, setShowHidePassword] = useState(false)
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(userLogin(values));
    console.log(values);
  };

  const handlePassword = () => {
    setShowHidePassword(!showHidePassword)
  }
  return (
    <div className="login">
      <Row gutter={16} className="d-flex align-items-center">
        <Col lg={12} style={{ position: "relative" }}>
          <img
            src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YmxhY2slMjBjYXJ8ZW58MHx8MHx8&w=1000&q=80"
            alt=""
          />
          <h1 className="login-logo">Rent A Vehicle</h1>
        </Col>
        <Col lg={12} className="text-left p-5">
          <Form
            layout="vertical"
            className="login-form p-5"
            onFinish={onFinish}
            style={{width:"35vw",marginTop:"10rem" ,marginLeft:"5rem"}}
          >
            <h1>Login</h1>
            <hr />
            <Form.Item name="email"  label={<p style={{ fontSize: "20px" ,color:"#fff"}}>Email</p>} rules={[{ required: true }]}>
              <Input size="large" style={{fontSize:"18px"}}/>
            </Form.Item>
            <Form.Item
              type="password"
              name="password"
              label={<p style={{ fontSize: "20px" ,color:"#fff"}}>Password</p>}
              rules={[{ required: true }]}
            >
              <Input.Password size="large" style={{backgroundColor:"#292929" ,border:0,fontSize:"18px"}} className="eye" />
              {/* <div style={{display: "flex", height: "30px", alignItems: "center", justifyContent: "center"}}>
              <Input type={showHidePassword ? "text" : "password"} />
              <p style={{border: '1px solid orangered', width: "50px",height: "30px", padding: "5px", color: "orangered", borderRadius: "5px", backgroundColor: "white", cursor: "pointer"}} onClick={handlePassword}>{showHidePassword ? "Hide" : "Show"}</p>
              </div> */}
            </Form.Item>

            <button style={{borderRadius:"10px",padding:"15px",fontSize:"18px",marginBottom:"10px",width:"30.5vw"}}>Login</button>

            <br />
            <div style={{display:"flex",justifyContent:"space-between"}}>
            <Link to="/register" style={{ textDecoration: "none" ,fontSize:"17px"}}>
              Don't have an Account? <span style={{textDecoration:"underline"}}>Register</span>
            </Link>
            <br />
            <Link to="/forgot-password" style={{ textDecoration: "none",fontSize:"17px" }}>
              Forgot Password?
            </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
