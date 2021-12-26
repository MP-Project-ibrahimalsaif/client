import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CreateAuction from "./components/CreateAuction";
import "./App.css";

const App = () => {
  return(
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/createAuction" element={<CreateAuction />} />
      </Routes>
    </>
  );
};

export default App;
