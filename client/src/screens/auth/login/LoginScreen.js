import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ApiConnector from "../../../api/apiConnector";
import ApiEndpoints from "../../../api/apiEndpoints";
import AppPaths from "../../../lib/appPaths";
import CookieUtil from "../../../util/cookieUtil";
import "../authStyle.css";

import CryptoJS from "crypto-js";

const LoginScreen = ({ location }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const [loginError, setLoginError] = useState(null);

  const onSubmit = async (loginData) => {
    Object.keys(loginData).forEach((key) => {
      if (key === "password") {
        loginData[key] = CryptoJS.SHA256(loginData[key]).toString();
      }
    });
    const successLoginData = await ApiConnector.sendPostRequest(
      ApiEndpoints.LOGIN_URL,
      JSON.stringify(loginData),
      false,
      false
    );
    // console.log("logindata", successLoginData)
    if (successLoginData.access) {
      Object.keys(successLoginData).forEach((key) => {
        CookieUtil.setCookie(key, successLoginData[key]);
      });
      window.location.href = AppPaths.HOME;
    }
    else {
    handleLoginError(successLoginData);
  }

  };

  const handleLoginError = (response) => {
    setLoginError("Invalid email or password.");
    // if (response && response.detail) {
    //   setLoginError(response.detail);
    // } else {
    //   setLoginError("Invalid email or password.");
    // }
  };


  const getLoginMessage = () => {
    if (
      location &&
      location.state &&
      location.state.redirectFrom === AppPaths.SIGN_UP
    ) {
      return (
        <div id="loginMessage">
          Your account has been created successfully. Please login.
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    // console.log("ERRROS",errors)
    if (errors.username || errors.password) {
      // console.log("setting to null")
      setLoginError(null);
    }
  },[errors])

  return (
    <div id="authFormContainer">
      <div id="authForm">
        {getLoginMessage()}
        <h2 id="authTitle">Login</h2>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="authFieldContainer">
            <input
              className={`${"authField"} ${errors.username ? "errorInputField" : ""}`}
              type="email"
              placeholder="Email"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <p className="requiredFieldError">This field is required</p>
            )}
          </div>
          <div className="authFieldContainer">
            <input
              className={`${"authField"} ${errors.password ? "errorInputField" : ""}`}
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="requiredFieldError">This field is required</p>
            )}
          </div>
          {loginError && (
            <p className="requiredFieldError">{loginError}</p>
          )}
          <br />
          <button className="btn btn-outline-warning btn-block" type="submit">
            Login
          </button>
        </form>
        <p id="authFormFooter">
          Don't have any account! <Link to="/signup">Click here</Link> to
          singup.
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
