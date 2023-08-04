import React, { useEffect, useState } from "react";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, deleteUser } from "../../redux/actions/userActions";
import Spinner from "../../components/Spinner/Spinner";
import { Col, Row, Popconfirm } from "antd";

const Users = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.usersReducer);
  const { loading } = useSelector((state) => state.alertsReducer);

  useEffect(() => {
    try {
      if (users.length == 0) {
        dispatch(getAllUsers());
      }
    } catch (err) {
      console.log(err);
    }
  }, [users]);

  return (
    <>
      <AdminHeader />
      {loading && <Spinner />}
      <h3 className="text-center mt-2">Users</h3>
      <Row justify="center" gutter={16}>
        <Col lg={20} sm={24}>
          {users.map((user) => {
            return (
              <Row gutter={16} className="bs1 mt-3 text-left">
                <Col lg={6} sm={24}>
                  <p style={{ fontSize: "18px" }}>
                    <b>{user.name}</b>
                  </p>
                  <p>
                    Phone number: <b>{user.phone}</b>
                  </p>
                  <p>
                    Address: <b>{user.address}</b>
                  </p>
                </Col>
                <Col lg={6} sm={24}></Col>
                <Col lg={6} sm={24}></Col>
                <Col lg={6} sm={24} className="text-right mt-4">
                  <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this booking?"
                    onConfirm={() => {
                      dispatch(deleteUser({ userid: user._id }));
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <button className="loginBtn">Delete User</button>
                  </Popconfirm>
                </Col>
              </Row>
            );
          })}
        </Col>
      </Row>
    </>
  );
};

export default Users;
