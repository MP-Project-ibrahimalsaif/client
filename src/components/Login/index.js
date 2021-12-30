import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { BsGoogle } from "react-icons/bs";
import { useSnackbar } from "notistack";
import Navbar from "./../Navbar";
import Footer from "./../Footer";
import { userLogin } from "./../../reducers/Login";
import "./style.css";

const popupTools = require("popup-tools");
const MySwal = withReactContent(Swal);

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
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

  const login = async () => {
    setMessage("");
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, {
        email,
        password,
      });
      dispatch(
        userLogin({
          role: res.data.result.role.role,
          token: res.data.token,
          user: res.data.result,
        })
      );
      handleSnackbar("you have been logged-in successfully", "success");
      navigate("/");
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const googleLogin = () => {
    popupTools.popup(
      `${process.env.REACT_APP_BASE_URL}/auth/google`,
      "Google Login",
      { width: 400, height: 600 },
      function (err, user) {
        if (err) {
          console.log(err);
          handleSnackbar("oops something went wrong", "error");
        } else {
          dispatch(
            userLogin({
              role: user.result.role.role,
              token: user.token,
              user: user.result,
            })
          );
          handleSnackbar("you have been logged-in successfully", "success");
          navigate("/");
        }
      }
    );
  };

  const forgotPassword = async () => {
    const { value: email } = await MySwal.fire({
      title: "Forgot Password",
      input: "email",
      inputPlaceholder: "Enter your email address",
      showCancelButton: true,
      confirmButtonColor: "#2f2057",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (email) {
      try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/check_email`, {
          email,
        });
        MySwal.fire({
          icon: "success",
          text: "Check your email to reset the password",
          confirmButtonColor: "#2f2057",
        });
      } catch (error) {
        MySwal.fire({
          icon: "error",
          text: "Something went wrong!",
          confirmButtonColor: "#2f2057",
        });
      }
    }
  };

  return (
    <>
      <Navbar show={true} />
      <div className="login">
        {!state.token ? (
          <div className="loginBox">
            <p className="signupOption">
              Don't have an account?{" "}
              <a href="/signup" className="signupOptionLink">
                Sign Up
              </a>
            </p>
            <h1 className="loginWelcome">Welcome to MAZAD</h1>
            <p className="loginWelcomeDesc">
              Login now to start using the platform
            </p>
            {message ? <div className="message">{message}</div> : ""}
            <form
              className="loginForm"
              onSubmit={(e) => {
                e.preventDefault();
                login();
              }}
            >
              <div className="loginFormSection">
                <label> Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="loginEmail"
                  required
                />
              </div>
              <div className="loginFormSection">
                <label> Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="loginPassword"
                  required
                />
              </div>
              <p className="forgotPassword" onClick={forgotPassword}>
                forgot your password?
              </p>
              <div className="loginFormSection">
                <input
                  type="submit"
                  value="Login to account"
                  className="loginBtn"
                />
              </div>
            </form>
            <div className="googleOption">Or sign in with</div>
            <div className="googleLogin" onClick={googleLogin}>
              <BsGoogle className="googleLogo" />
            </div>
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

export default Login;
