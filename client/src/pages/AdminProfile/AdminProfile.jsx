import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import { editUser, getAllUsers } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import AdminHeader from "../../components/AdminHeader/AdminHeader";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.usersReducer);
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editConfirmPassword, setEditConfirmPassword] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const user1 = users.filter((o) => o._id == user.otherInfo._id);

  const name = user1.map((user) => user.name);
  const address = user1.map((user) => user.address);
  const phone = user1.map((user) => user.phone);
  const userid = user1.map((user) => user._id);

  const reqObj = {
    userid,
    editName,
    editPhone,
    editAddress,
    editPassword,
    editConfirmPassword,
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const handleSubmit = () => {
    dispatch(editUser(reqObj));
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <AdminHeader />
      <div className="container">
        <div className="box">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
            height="200px"
          />
          <h3 style={{ color: "black" }}>{name}</h3>
          <h5 style={{ color: "black" }}>{address}</h5>
          <h5 style={{ color: "black" }}>{phone}</h5>
          <div>
            <Button variant="outlined" onClick={handleClickOpen}>
              Edit Profile
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>EDIT PROFILE</DialogTitle>
              <DialogContent>
                <InputLabel htmlFor="name">Name</InputLabel>
                <FilledInput
                  id="name"
                  type="text"
                  onChange={(e) => {
                    setEditName(e.target.value);
                  }}
                />

                <InputLabel htmlFor="address">Address</InputLabel>
                <FilledInput
                  id="address"
                  type="text"
                  onChange={(e) => {
                    setEditAddress(e.target.value);
                  }}
                />

                <InputLabel htmlFor="phone">Phone</InputLabel>
                <FilledInput
                  id="phone"
                  type="text"
                  onChange={(e) => {
                    setEditPhone(e.target.value);
                  }}
                />

                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <FilledInput
                  id="filled-adornment-password"
                  onChange={(e) => {
                    setEditPassword(e.target.value);
                  }}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />

                <InputLabel htmlFor="outlined-adornment-password">
                  Confirm Password
                </InputLabel>
                <FilledInput
                  id="filled-adornment-confirmPassword"
                  onChange={(e) => {
                    setEditConfirmPassword(e.target.value);
                  }}
                  type={showConfirmPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Confirm</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
