import React from "react";
import { Row, Col, Form, Input } from "antd";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword, userLogin } from "../../redux/actions/userActions";

const ResetPassword = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    values.userid = id;
    dispatch(resetPassword(values));
    console.log(values);
  };

  const handleSubmit = () => {
    const reqObj = {
      userid: user._id,
    };
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
            <h1>Reset Password</h1>
            <hr />
            <Form.Item
              name="password"
              label="New Password"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <button className="loginBtn" onClick={handleSubmit}>
              Reset
            </button>

            <br />
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ResetPassword;
