import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReactCodeInput from "react-verification-code-input";
import PasswordChecklist from "react-password-checklist";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./style.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const handleSnackbar = (message, type) => {
    enqueueSnackbar(message, {
      variant: type,
    });
  };

  const resetPassword = async () => {
    if (code.length > 0) {
      try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/reset_password`, {
          id,
          code,
          password,
        });
        handleSnackbar("password was updated successfully", "success");
        navigate("/login");
      } catch (error) {
        handleSnackbar("oops something went wrong", "error");
      }
    }
  };

  return (
    <>
      <Navbar show={true} />
      <div className="resetPasswordWrapper">
        <div className="resetPasswordBox">
          <h1>Reset Your Password</h1>
          <PasswordChecklist
            rules={[
              "minLength",
              "specialChar",
              "number",
              "capital",
              "lowercase",
            ]}
            minLength={6}
            value={password}
            onChange={(isValid) => {
              if (isValid) {
                const button = document.querySelector(".resetBtn");
                button.disabled = false;
              } else {
                const button = document.querySelector(".resetBtn");
                button.disabled = true;
              }
            }}
          />
          <TextField
          id="outlined-password-input"
          type="password"
          placeholder='New Password'
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            className: 'passwordInput'
          }}
          autoComplete="current-password"
          required
        />
          <ReactCodeInput fields={4} onComplete={(val) => setCode(val)} />
          <input
            type="submit"
            value="Reset"
            className="resetBtn"
            onClick={resetPassword}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResetPassword;
