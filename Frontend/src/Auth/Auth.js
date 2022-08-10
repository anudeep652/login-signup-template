import React, { useState, useEffect } from "react";
import "./styles.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { login, register, reset } from "../features/auth/authslice";
import { useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const { isSuccess } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if(isSuccess){
      navigate("/auth/dashboard");

    }
    

    
  }, [isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      name: "",
      email: "",
      password: "",
    });
    if (signUp) {
      dispatch(register(formData));
    }
    dispatch(login(formData));
  };

  const Toggle = () => {
    setIsSignUp((prev) => !prev);
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
          <button type="button" className="login-with-google-btn">
            Continue with Google
          </button>
        </div>
        <button className="bt-button" onClick={Toggle}>
          {signUp
            ? "already have an account?Log In"
            : "Don't have an account? SignUp"}
        </button>
      </form>
    </>
  );
}

export default Auth;
