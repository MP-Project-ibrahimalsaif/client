import React from "react";
import { FaGavel, FaList, FaFileInvoiceDollar, FaUsers } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { FiDollarSign } from "react-icons/fi";
import { IoNewspaperSharp } from "react-icons/io5";
import "./style.css";

const Sidenav = () => {
  return (
    <div className="sidenav">
      <div className="sidenavInfo">
        <div className="sidenavLogo">
          <img src="/logo.png" alt="Logo" />
        </div>
        <div className="sidenavLinks">
          <div>
            <FaGavel /> Auctions
          </div>
          <div>
            <FaList /> WatchList
          </div>
          <div>
            <FiDollarSign /> Bids
          </div>
          <div>
            <FaFileInvoiceDollar /> Invoices
          </div>
          <div>
            <MdAccountCircle /> Account
          </div>
          <div>
            <FaGavel /> Auctions
          </div>
          <div>
            <FaUsers /> Users
          </div>
          <div>
            <IoNewspaperSharp /> Reports
          </div>
        </div>
      </div>
      <div className="sidenavLogout">
        <button className="sidenavLogoutBtn">Logout</button>
      </div>
    </div>
  );
};

export default Sidenav;
