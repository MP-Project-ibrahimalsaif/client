import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { userLogout } from "./../../reducers/Login";
import "./style.css";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [navbar, setNavbar] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
      role: state.Login.role,
      user: state.Login.user,
    };
  });

  const signout = async () => {
    dispatch(userLogout({ role: "", token: "", user: null }));
    await axios.get(`${process.env.REACT_APP_BASE_URL}/logout`);
    navigate("/login");
  };

  const hamburgerClick = () => {
    setOpenMenu(!openMenu);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeColor = () => {
    if (window.scrollY > 15) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeColor);

  return (
    <>
      <nav className={navbar ? "navbar navbarColored" : "navbar"}>
        <div className="logo">
          <img src="logo.png" alt="Logo" />
        </div>
        <>
          <div className="hamburger" onClick={hamburgerClick}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <ul className="navLinks">
            <li className="link">
              <a href="/">Home</a>
            </li>
            <span className="dot link">&#11044;</span>
            <li className="link">
              <a href="/explore">Explore</a>
            </li>
          </ul>
        </>
        <div className="navbarButtonsAvatar">
          {state.token ? (
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
                    <Avatar sx={{ width: 45, height: 45 }}>M</Avatar>
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
                <MenuItem>
                  <FaUser />
                  &nbsp;Profile
                </MenuItem>
                <MenuItem>
                  <MdDashboard />
                  &nbsp;Dashboard
                </MenuItem>
                <MenuItem onClick={signout}>
                  <BiLogOut />
                  &nbsp;Logout
                </MenuItem>
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
        <a href="/#" className="closebtn" onClick={hamburgerClick}>
          &times;
        </a>
        {state.token && (
          <div className="overlayAvatar">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="Account settings">
                <IconButton onClick={handleClick}>
                  <Avatar sx={{ width: 60, height: 60 }}>M</Avatar>
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
              <MenuItem>
                <FaUser />
                &nbsp;Profile
              </MenuItem>
              <MenuItem>
                <MdDashboard />
                &nbsp;Dashboard
              </MenuItem>
              <MenuItem onClick={signout}>
                <BiLogOut />
                &nbsp;Logout
              </MenuItem>
            </Menu>
          </div>
        )}
        <div
          className={state.token ? "overlayContent contentMargin" : "overlayContent"}
        >
          <a href="/">Home</a>
          <a href="/explore">Explore</a>
          {!state.token && (
            <div className="overlyButtons">
              <button className="login-button">Login</button>
              <button className="signup-button">Signup</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
