import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./style.css";

const VerifyFromEmail = () => {
  return (
    <>
      <Navbar show={true} />
      <div className="verify">
        <div className="verifyBox">
          <h1>Thank you !</h1>
          <p>Thanks for registering in our website</p>
          <p>You should receive your confirmation email soon</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VerifyFromEmail;
