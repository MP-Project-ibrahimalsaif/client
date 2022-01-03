import React from "react";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./style.css";

const VerifyFromEmail = () => {
  const { enqueueSnackbar } = useSnackbar();

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
    };
  });

  const handleSnackbar = (message, type) => {
    enqueueSnackbar(message, {
      variant: type,
    });
  };

  return (
    <>
      <Navbar show={true} />
      <div className="verify">
      {state.token ? (
          <div className="verifyBox">
            <h1>Thank you !</h1>
            <p>Thanks for registering in our website</p>
            <p>You should receive your confirmation email soon</p>
          </div>
      ) : (
        <div className="error">
          <img src="./img/stop.svg" className="errorImg" alt="error" />
          <h1 className="errorText">You already logged in</h1>
        </div>
      )}
      </div>
      <Footer />
    </>
  );
};

export default VerifyFromEmail;
