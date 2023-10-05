import React from "react";
import { Row, Col, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgotPassword, userLogin } from "../../redux/actions/userActions";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(forgotPassword(values));
    console.log(values);
  };
  return (
    <div className="login">
      <Row gutter={16} className="d-flex align-items-center">
        <Col lg={16} style={{ position: "relative" }}>
          <img
            src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YmxhY2slMjBjYXJ8ZW58MHx8MHx8&w=1000&q=80"
            alt=""
          />
          <h1 className="login-logo">Rent A Vehicle</h1>
        </Col>
        <Col lg={8} className="text-left p-5">
          <Form
            layout="vertical"
            className="login-form p-5"
            onFinish={onFinish}
          >
            <h1>Forgot Password</h1>
            <hr />
            <Form.Item name="email" label="Email" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <button className="loginBtn">Send</button>

            <br />
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ForgotPassword;
