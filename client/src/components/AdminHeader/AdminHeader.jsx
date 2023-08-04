import React from "react";
import "./adminHeader.css";
import { Button, Dropdown, Space, Row, Col } from "antd";
import { Link } from "react-router-dom";

const AdminHeader = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const items = [
    {
      key: "1",
      label: (
        <li
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Home
        </li>
      ),
    },

    {
      key: "2",
      label: (
        <li
          onClick={() => {
            window.location.href = "/users";
          }}
        >
          Users
        </li>
      ),
    },
    {
      key: "3",
      label: (
        <li
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
        >
          Logout
        </li>
      ),
    },
  ];
  return (
    <>
      <div>
        <div className="header bs1">
          <Row gutter={16} justify="center">
            <Col lg={20} sm={24} xs={24}>
              <div className="d-flex justify-content-between">
                <Link to="/" style={{ textDecoration: "none" }}>
                  <h1>ADMINPANEL</h1>
                </Link>

                <Space direction="vertical">
                  <Space wrap>
                    <Dropdown
                      menu={{
                        items,
                      }}
                      placement="bottomLeft"
                    >
                      <Button>{user.otherInfo.name}</Button>
                    </Dropdown>
                  </Space>
                </Space>
              </div>
            </Col>
          </Row>
        </div>
        <div className="content"></div>
      </div>
    </>
  );
};

export default AdminHeader;
