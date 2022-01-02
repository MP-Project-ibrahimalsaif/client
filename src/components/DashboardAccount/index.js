import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { storage } from "./../firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TextField from "@mui/material/TextField";
import { MdEdit } from "react-icons/md";
import { useSnackbar } from "notistack";
import { updateUser } from "./../../reducers/Login";
import Sidenav from "../Sidenav";
import "./style.css";

const MySwal = withReactContent(Swal);

const DashboardAccount = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
      user: state.Login.user,
    };
  });

  useEffect(() => {
    updateAccount();
    // eslint-disable-next-line
  }, []);

  const handleSnackbar = (message, type) => {
    enqueueSnackbar(message, {
      variant: type,
    });
  };

  const handleUpload = (image) => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
          });
      }
    );
  };

  const updateAvatar = async () => {
    const { value: file } = await MySwal.fire({
      title: "New Avatar",
      input: "file",
      inputLabel: "Chose your image",
      showCancelButton: true,
      confirmButtonColor: "#2f2057",
      confirmButtonText: "Update",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      inputAttributes: {
        accept: "image/*",
        "aria-label": "Upload your profile picture",
      },
    });

    if (file) {
      handleUpload(file);
    }
  };

  const updateAccount = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/users`,
        { name, avatar: url },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      const user = state.user;
      user.avatar = url ? url : user.avatar;
      user.name = name ? name : user.name;

      dispatch(updateUser(user));

      if (name || url)
        handleSnackbar("the profile has been updated successfully", "success");
    } catch (error) {
      console.log(error);
      handleSnackbar("oops something went wrong", "error");
    }
  };

  const resetPassword = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/check_email`,
        { email: state.user.email },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      MySwal.fire({
        icon: "success",
        title: "Email has been sent",
        text: "Check your email, an email with a reset password link and code has been sent to you",
        confirmButtonColor: "#2f2057",
      });
    } catch (error) {
      console.log(error);
      handleSnackbar("oops something went wrong", "error");
    }
  };

  return (
    <>
      {state.token ? (
        <>
          <Sidenav />
          <div className="dashboardLayout">
            <h1 className="dashboardAccountTitle">My Account</h1>
            <div className="dashboardAccount">
              <div className="imgCon">
                <a href="#\" onClick={updateAvatar}>
                  <div className="imgConOverlay"></div>
                  <img src={url ? url : state.user.avatar} />
                  <div className="imgConOverlayContent imgConOverlayFadeIn">
                    <MdEdit className="avatarEditIcon" />
                  </div>
                </a>
              </div>
              <div className="nameCon">
                <label>Name</label>
                <TextField
                  className="nameInput"
                  id="outlined"
                  onChange={(e) => setName(e.target.value)}
                  defaultValue={name ? name : state.user.name}
                />
              </div>
              <button className="SaveChangestBtn" onClick={updateAccount}>
                Save Changes
              </button>
              {state.user.auth !== "google" && (
                <button className="ChangePasswordtBtn" onClick={resetPassword}>
                  Change Password
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="centerDashboard">
          <div className="error">
            <img src="/img/stop.svg" className="errorImg" alt="error" />
            <h1 className="errorText">You are not logged in yet</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardAccount;
