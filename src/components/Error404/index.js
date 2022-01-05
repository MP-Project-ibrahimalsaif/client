import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./style.css";

const Error404 = () => {
  return (
    <>
      <Navbar show={true} />
      <div className="errorHight">
        <img src="/img/stop.svg" className="errorImg" alt="error" />
        <h1 className="errorText">Error 404 - Page not found</h1>
      </div>
      <Footer />
    </>
  );
};

export default Error404;
