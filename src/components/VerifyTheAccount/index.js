import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReactCodeInput from "react-verification-code-input";
import { useSnackbar } from "notistack";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./style.css";

const VerifyTheAccount = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [code, setCode] = useState("");

  const handleSnackbar = (message, type) => {
    enqueueSnackbar(message, {
      variant: type,
    });
  };

  const verifyAccount = async () => {
    if (code.length > 0) {
      try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/verify_account`, {
          id,
          code,
        });
        handleSnackbar(
          "your account has been activated successfully",
          "success"
        );
        navigate("/login");
      } catch (error) {
        handleSnackbar("oops something went wrong", "error");
      }
    }
  };

  return (
    <>
      <Navbar show={true} />
      <div className="verify">
        <div className="verifyBox">
          <h1>Verify Your Account</h1>
          <ReactCodeInput fields={4} onComplete={(val) => setCode(val)} />
          <button className="verifyBtn" onClick={verifyAccount}>Verify</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VerifyTheAccount;
