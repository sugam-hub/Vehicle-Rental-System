import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Link } from "react-router-dom";

const primaryColor = "#2196F3";
const secondaryColor = "#0777d3";
const textColor = "#FFFFFF";

const titleStyle = {
  marginLeft: 0,
  flexGrow: 1,
  fontFamily: "Roboto, sans-serif",
  fontWeight: 700,
  letterSpacing: ".3rem",
  color: textColor,
  textDecoration: "none",
  // fontSize: "2rem"
};

const buttonStyle = {
  fontFamily: "Roboto, sans-serif",
  fontWeight: 500,
  color: textColor,
  display: "block",
  marginY: 2,
  marginRight: "10px"
};

const toolbarStyle = {
  padding: "0 16px",
  display: "flex",
  alignItems: "center",
};

const buttonHoverStyle = {
  "&:hover": {
    backgroundColor: secondaryColor,
  },
};

const DefaultLayout = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const menuItemStyle = {
    fontSize: "1.2rem", 
  };

  const notificationIconStyle = {
    color: "white",
    marginLeft: "16px",
    marginTop: "6px",
    fontSize: "50px"
  };
  
  const avatarIconStyle = {
    width: "50px", 
    height: "50px",
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: primaryColor }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={toolbarStyle}>
          <Typography variant="h6" noWrap component="a" href="/" sx={titleStyle}>
            RENT A VEHICLE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu} sx={menuItemStyle}>
                <Typography textAlign="center">
                  <Link
                    style={{ textDecoration: "none", color: textColor }}
                    to="/"
                  >
                    Home
                  </Link>
                </Typography>
              </MenuItem>

              <MenuItem sx={menuItemStyle}>
                <Typography
                  textAlign="center"
                  onClick={() => {
                    window.location.href = "/booking/userbookings";
                  }}
                >
                  Bookings
                </Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => {
                window.location.href = "/";
              }}
              sx={{ ...buttonStyle, ...buttonHoverStyle, ...menuItemStyle}}
            >
              Home
            </Button>
            <Button
              onClick={() => {
                window.location.href = "/booking/userbookings";
              }}
              sx={{ ...buttonStyle, ...buttonHoverStyle, ...menuItemStyle }}
            >
              Bookings
            </Button>
            <Button
              onClick={() => {
                window.location.href = "/admin";
              }}
              sx={{ ...buttonStyle, ...buttonHoverStyle, ...menuItemStyle }}
            >
              Add Vehicle
            </Button>
          </Box>

          <Link to="/notification" style={{ textDecoration: "none" }}>
            <NotificationsNoneIcon
              style={notificationIconStyle}
            />
          </Link>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" sx={avatarIconStyle} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography
                  textAlign="center"
                  onClick={() => {
                    window.location.href = "/profile";
                  }}
                >
                  Profile
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography
                  textAlign="center"
                  onClick={() => {
                    localStorage.removeItem("user");
                    window.location.href = "/login";
                  }}
                >
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default DefaultLayout;
