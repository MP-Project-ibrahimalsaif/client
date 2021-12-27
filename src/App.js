import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Explore from "./components/Explore";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CreateAuction from "./components/CreateAuction";
import EditAuction from "./components/EditAuction";
import "./App.css";

const App = () => {
  return(
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/explore" element={<Explore />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/create_auction" element={<CreateAuction />} />
        <Route exact path="/edit_auction/:id" element={<EditAuction />} />
      </Routes>
    </>
  );
};

export default App;
