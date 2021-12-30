import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import PasswordChecklist from "react-password-checklist";
import { useSnackbar } from "notistack";
import Navbar from "./../Navbar";
import Footer from "./../Footer";
import "./style.css";

const Signup = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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

  const signup = async () => {
    setMessage("");
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/signup`, {
      name,
      email,
      password,
    });
    if (res.status === 201) {
      handleSnackbar("you have signup successfully", "success");
      navigate("/verify_from_email");
    } else {
      setMessage(res.data.message);
    }
  };

  return (
    <>
      <Navbar show={true} />
      <div className="signup">
        {!state.token ? (
          <div className="signupBox">
            <p className="loginOption">
              You have an account?{" "}
              <a href="/login" className="loginOptionLink">
                Login
              </a>
            </p>
            <h1 className="signupWelcome">Welcome to MAZAD</h1>
            <p className="signupWelcomeDesc">
              signup now to start using the platform
            </p>
            {message ? <div className="message">{message}</div> : ""}
            <form
              className="signupForm"
              onSubmit={(e) => {
                e.preventDefault();
                signup();
              }}
            >
              <div className="signupFormSection">
                <label>Name</label>
                <input
                  type="text"
                  name="Name"
                  onChange={(e) => setName(e.target.value)}
                  className="signupName"
                  required
                />
              </div>
              <div className="signupFormSection">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="signupEmail"
                  required
                />
              </div>
              <div className="signupFormSection">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="signupPassword"
                  required
                />
              </div>
              <div className="center">
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
                      const button = document.querySelector(".signupBtn");
                      button.disabled = false;
                    } else {
                      const button = document.querySelector(".signupBtn");
                      button.disabled = true;
                    }
                  }}
                />
              </div>
              <div className="signupFormSection">
                <input
                  type="submit"
                  value="Signup"
                  className="signupBtn"
                  disabled
                />
              </div>
            </form>
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

export default Signup;
