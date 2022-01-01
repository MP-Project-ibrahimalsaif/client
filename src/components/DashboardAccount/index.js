import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TextField from "@mui/material/TextField";
import { MdEdit } from "react-icons/md";
import { addAuctionToWatchList } from "./../../reducers/Login";
import Sidenav from "../Sidenav";
import "./style.css";

const MySwal = withReactContent(Swal);

const DashboardAccount = () => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

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

  const updateAccount = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/userAuctions/${state.user._id}`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
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
              <div class="imgCon">
                <a href="#\">
                  <div class="imgConOverlay"></div>
                  <img src={state.user.avatar} />
                  <div class="imgConOverlayContent imgConOverlayFadeIn">
                    <MdEdit className="avatarEditIcon" />
                  </div>
                </a>
              </div>
              <div className="nameCon">
                <label>Name</label>
                <TextField
                  className="nameInput"
                  id="outlined"
                  defaultValue={state.user.name}
                />
              </div>
              <button className="SaveChangestBtn">
                Save Changes
              </button>
              <button className="ChangePasswordtBtn">
                Change Password
              </button>
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
