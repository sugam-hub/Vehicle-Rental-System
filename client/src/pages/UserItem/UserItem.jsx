import React, { useState } from "react";
import { Col, Row, Popconfirm } from "antd";
import { Button } from "@mui/material";
import EditProfileDialog from "../EditProfileDialog/EditProfileDialog";
// import "./popUp.css"

const UserItem = ({
  user,
  deleteUser,
  editUserByAdmin,
  handleEdit,
  isEditing,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(open);

  return (
    <Row gutter={16} className="bs1 mt-4 text-left">
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
          description="Are you sure to delete this user?"
          onConfirm={() => {
            deleteUser(user._id);
          }}
          okText="Yes"
          cancelText="No"
        >
          <button className="loginBtn">Delete User</button>
        </Popconfirm>
        <Button variant="outlined" onClick={handleEdit} className="loginBtn">
          Edit Profile
        </Button>
        <EditProfileDialog
          open={isEditing}
          handleClose={handleClose}
          user={user}
          onSubmit={editUserByAdmin}
        />
      </Col>
    </Row>
  );
};

export default UserItem;
