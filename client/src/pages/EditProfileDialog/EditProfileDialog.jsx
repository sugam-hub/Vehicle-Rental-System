import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FilledInput,
  InputAdornment,
  IconButton,
  InputLabel,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const EditProfileDialog = ({ open, handleClose, user, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editConfirmPassword, setEditConfirmPassword] = useState("");

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () =>
    setShowPassword((show) => !showPassword);

  const handleSubmit = () => {
    const reqObj = {
      userid: user._id,
      editName,
      editPhone,
      editAddress,
      editPassword,
      editConfirmPassword,
    };
    onSubmit(reqObj);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>EDIT PROFILE</DialogTitle>
      <DialogContent>
        <InputLabel htmlFor="name">Name</InputLabel>
        <FilledInput
          id="name"
          type="text"
          onChange={(e) => setEditName(e.target.value)}
        />

        <InputLabel htmlFor="address">Address</InputLabel>
        <FilledInput
          id="address"
          type="text"
          onChange={(e) => setEditAddress(e.target.value)}
        />

        <InputLabel htmlFor="phone">Phone</InputLabel>
        <FilledInput
          id="phone"
          type="text"
          onChange={(e) => setEditPhone(e.target.value)}
        />

        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <FilledInput
          id="filled-adornment-password"
          onChange={(e) => setEditPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />

        <InputLabel htmlFor="outlined-adornment-password">
          Confirm Password
        </InputLabel>
        <FilledInput
          id="filled-adornment-confirmPassword"
          onChange={(e) => setEditConfirmPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
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
  );
};

export default EditProfileDialog;
