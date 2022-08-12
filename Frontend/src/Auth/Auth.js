import React, { useState, useEffect } from "react";
import "./styles.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { login, register, reset,googleAuth } from "../features/auth/authslice";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { GoogleLogin } from 'react-google-login';
import { gapi } from "gapi-script"


function Auth() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  // let [error, setError] = useState("");
  const [signUp, setIsSignUp] = useState(true);
  const dispatch = useDispatch();
  let { isSuccess, user, isError,message } = useSelector((state) => state.auth);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: '320690073749-24oe8tofu54ep0cbelvq8of8uvsjcnhi.apps.googleusercontent.com',
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/user/dashboard");
    }
    if (signUp) {
      if (formData.email && formData.password) {
        message="";
      }
    } else {
      if (formData.email && formData.password) {
        message="";
      }
    }
  }, [isSuccess, navigate, user, isError, signUp, formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signUp) {
      if (formData.name && formData.email && formData.password) {
        dispatch(register(formData));
      }
      message="please fll all the fields"
    }if(!signUp){

      if (formData.email && formData.password) {
        dispatch(login(formData));
      } else {
        message="please fill all the fields"
      }
    }
    dispatch(reset());
    setFormData({
      name: "",
      email: "",
      password: "",
    });

  };

  const Toggle = () => {
    setIsSignUp((prev) => !prev);
    message="";
    dispatch(reset());
  };

  const googleError = (error) => console.log('Google Sign In was unsuccessful. Try again later');

  const googleSuccess = async (res) => {
    const result = await res?.profileObj;
    const token = await res?.tokenId;
    console.log(token);

    try {
      dispatch(googleAuth(result))
      

      navigate('/user/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className={signUp ? "signup" : "login"}
      >
        {message && (
          <div className="error">
            <Alert variant="filled" severity="error">
              {message}
            </Alert>
          </div>
        )}
        <h3>{signUp ? "Register " : "Login "}here </h3>

        {signUp && (
          <>
            <label htmlFor="email">name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              placeholder="Name"
              autoComplete="off"
              autoFocus
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </>
        )}

        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="username"
          value={formData.email}
          placeholder="Email"
          autoComplete="off"
          autoFocus
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={formData.password}
          placeholder="Password"
          id="password"
          autoComplete="off"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <button type="submit">{signUp ? "Sign  Up " : "Login "}</button>
        <div className="social">
          {/* <button type="button" className="login-with-google-btn">
            Continue with Google
          </button> */}
          <GoogleLogin
            clientId="320690073749-24oe8tofu54ep0cbelvq8of8uvsjcnhi.apps.googleusercontent.com"
            render={(renderProps) => (
              <button type="button" onClick={renderProps.onClick} disabled={renderProps.disabled} className="login-with-google-btn">
            Continue with Google
          </button>
            )}
            onSuccess={ googleSuccess}
            onFailure={ googleError}
            cookiePolicy={'single_host_origin'}
            // isSignedIn={true}
          />
        </div>
      </form>
      <button className={signUp ? "reg-bt" : "log-bt"} onClick={Toggle}>
        {signUp
          ? "already have an account?Log In"
          : "Don't have an account? SignUp"}
      </button>
    </>
  );
}

export default Auth;


