import React, { useEffect, useState } from "react";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  editUserByAdmin,
  deleteUser,
} from "../../redux/actions/userActions";
import Spinner from "../../components/Spinner/Spinner";
import { Col, Row, Popconfirm } from "antd";
import UserItem from "../UserItem/UserItem";

const Users = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.usersReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Get the logged-in user's ID from localStorage
  const loggedInUserId = JSON.parse(localStorage.getItem("user"));
  console.log(loggedInUserId);

  useEffect(() => {
    try {
      if (users.length === 0) {
        dispatch(getAllUsers());
      }
    } catch (err) {
      console.log(err);
    }
  }, [users, dispatch]);

  const handleUserEdit = (userId) => {
    setSelectedUserId(userId);
  };

  // Filter out the logged-in user from the users list
  const filteredUsers = users.filter(
    (user) => user._id !== loggedInUserId.otherInfo._id
  );

  return (
    <>
      <AdminHeader />
      {loading && <Spinner />}
      <h3 className="text-center" style={{marginTop: "1rem"}}>Users</h3>
      <Row justify="center" gutter={16}>
        <Col lg={20} sm={24}>
          {filteredUsers.map((user) => (
            <UserItem
              key={user._id}
              user={user}
              deleteUser={(userId) => dispatch(deleteUser({ userid: userId }))}
              editUserByAdmin={(reqObj) => dispatch(editUserByAdmin(reqObj))}
              handleEdit={() => handleUserEdit(user._id)}
              isEditing={selectedUserId === user._id}
            />
          ))}
        </Col>
      </Row>
    </>
  );
};

export default Users;
