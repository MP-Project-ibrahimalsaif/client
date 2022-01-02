import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { FaGavel, FaList, FaFileInvoiceDollar, FaUsers } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { FiDollarSign } from "react-icons/fi";
import { IoNewspaperSharp } from "react-icons/io5";
import { userLogout } from "./../../reducers/Login";
import "./style.css";

const Sidenav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      user: state.Login.user,
    };
  });

  const signout = async () => {
    dispatch(userLogout({ role: "", token: "", user: null }));
    await axios.get(`${process.env.REACT_APP_BASE_URL}/logout`);
    navigate("/login");
  };

  return (
    <div className="sidenav">
      <div className="sidenavInfo">
        <div className="sidenavLogo">
          <img src="/logo.png" alt="Logo" onClick={() => navigate("/")} />
        </div>
        <div className="sidenavLinks">
          <div onClick={() => navigate("/dashboard/auctions")}>
            <FaGavel />&nbsp;Auctions
          </div>
          <div onClick={() => navigate("/dashboard/watchlist")}>
            <FaList />&nbsp;WatchList
          </div>
          <div onClick={() => navigate("/dashboard/bids")}>
            <FiDollarSign />&nbsp;Bids
          </div>
          <div onClick={() => navigate("/dashboard/invoices")}>
            <FaFileInvoiceDollar />&nbsp;Invoices
          </div>
          <div onClick={() => navigate("/dashboard/account")}>
            <MdAccountCircle />&nbsp;Account
          </div>
          {state.user && state.user.role.role === "admin" && (
            <>
              <div onClick={() => navigate("/dashboard/allauctions")}>
                <FaGavel />&nbsp;All Auctions
              </div>
              <div onClick={() => navigate("/dashboard/users")}>
                <FaUsers />&nbsp;Users
              </div>
              <div onClick={() => navigate("/dashboard/reports")}>
                <IoNewspaperSharp />&nbsp;Reports
              </div>
            </>
          )}
        </div>
      </div>
      <div className="sidenavLogout">
        <button className="sidenavLogoutBtn" onClick={signout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidenav;
