import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Explore from "./components/Explore";
import Auction from "./components/Auction";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CreateAuction from "./components/CreateAuction";
import EditAuction from "./components/EditAuction";
import DashboardAuctions from "./components/DashboardAuctions";
import DashboardWatchList from "./components/DashboardWatchList";
import DashboardBids from "./components/DashboardBids";
import DashboardAccount from "./components/DashboardAccount";
import DashboardAllAuctions from "./components/DashboardAllAuctions";
import DashboardUsers from "./components/DashboardUsers";
import DashboardReports from "./components/DashboardReports";
import DashboardInvoices from "./components/DashboardInvoices";
import "./App.css";

const App = () => {
  return(
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/explore" element={<Explore />} />
        <Route exact path="/explore/:id" element={<Auction />} />
        <Route exact path="/users/:id" element={<Profile />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/create_auction" element={<CreateAuction />} />
        <Route exact path="/edit_auction/:id" element={<EditAuction />} />
        <Route exact path="/dashboard/auctions" element={<DashboardAuctions />} />
        <Route exact path="/dashboard/watchlist" element={<DashboardWatchList />} />
        <Route exact path="/dashboard/bids" element={<DashboardBids />} />
        <Route exact path="/dashboard/account" element={<DashboardAccount />} />
        <Route exact path="/dashboard/allauctions" element={<DashboardAllAuctions />} />
        <Route exact path="/dashboard/users" element={<DashboardUsers />} />
        <Route exact path="/dashboard/reports" element={<DashboardReports />} />
        <Route exact path="/dashboard/invoices" element={<DashboardInvoices />} />
      </Routes>
    </>
  );
};

export default App;
