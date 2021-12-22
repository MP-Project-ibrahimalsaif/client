import React, { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import "./style.css";

const Navbar = () => {
  const [user, setUser] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const hamburgerClick = () => {
    setOpenMenu(!openMenu);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <img src="logo.png" alt="Logo" />
        </div>
        <>
          <div className="hamburger" onClick={hamburgerClick}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <ul className="nav-links">
            <li className="link">
              <a href="/">Home</a>
            </li>
            <li className="link">
              <a href="/explore">Explore</a>
            </li>
          </ul>
        </>
        <div className="navbarButtonsAvatar">
          {user ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Account settings">
                  <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                    <Avatar sx={{ width: 40, height: 40 }}>M</Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem>Dashboard</MenuItem>
                <MenuItem>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <button className="login-button">Login</button>
              <button className="signup-button">Signup</button>
            </>
          )}
        </div>
      </nav>
      <div id="myNav" className={openMenu ? "overlay open" : "overlay"}>
        <a
          href="javascript:void(0)"
          className="closebtn"
          onClick={hamburgerClick}
        >
          &times;
        </a>
        <div class="overlay-content">
          <a href="/">Home</a>
          <a href="/explore">Explore</a>
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="Account settings">
                <IconButton onClick={handleClick}>
                  <Avatar sx={{ width: 50, height: 50 }}>M</Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Dashboard</MenuItem>
              <MenuItem>Logout</MenuItem>
            </Menu>
          </>
        </div>
      </div>
    </>
  );
};

export default Navbar;
