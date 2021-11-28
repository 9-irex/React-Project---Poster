import React from "react";
import "./auth.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Access() {
  axios.defaults.withCredentials = true;

  const loginBtn = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/v1/poster/login", {
        Username: document.getElementById("username").value,
        Password: document.getElementById("password").value,
        Type: "Login",
      })
      .then((res) => {
        if (res.data.Message === "No") {
          alert(res.data.Message);
        } else {
          window.location.href = "/";
        }
      });
  };

  return (
    <div className="__container">
      <div className="wrapper">
        <div className="left__box">
          <div className="pattern"></div>
          <div className="__content">
            <div className="wrapper">
              <div className="top__content">
                <div className="brand__logo">
                  <div className="logo__icon">
                    <img src="./Images/SVG/logo.svg" alt="" />
                  </div>
                  <span className="logo__name">poster</span>
                </div>
                <span className="link">
                  i don't have an account
                  <Link to="/join">Register</Link>
                </span>
              </div>
              <div className="bottom__content">
                <p className="title">welcome dear!</p>
                <p className="paragraph">
                  We Are Delighted To Have You Among Us. On Behalf Of
                  <br />
                  All The Members And The Management, We Would Like
                  <br />
                  To Extend Our Warmest Welcome And Good Wishes!
                </p>
                <div className="social_icon">
                  <div className="icon">
                    <img src="./Images/SVG/linkedin.svg" alt="Linkedin" />
                  </div>
                  <div className="icon">
                    <img src="./Images/SVG/github.svg" alt="GitHub" />
                  </div>
                  <div className="icon">
                    <img src="./Images/SVG/facebook.svg" alt="Facebook" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="right__box">
          <div className="top__bar">
            <div className="left__bar">
              <div className="brand__logo">
                <div className="logo__icon">
                  <img src="./Images/SVG/logo copy.svg" alt="" />
                </div>
                <span className="logo__name">poster</span>
              </div>
            </div>
            <div className="right__bar">
              <div className="social_icon">
                <div className="icon">
                  <img src="./Images/SVG/linkedin copy.svg" alt="Linkedin" />
                </div>
                <div className="icon">
                  <img src="./Images/SVG/github copy.svg" alt="GitHub" />
                </div>
                <div className="icon">
                  <img src="./Images/SVG/facebook copy.svg" alt="Facebook" />
                </div>
              </div>
              <span className="link">
                i don't have an account
                <Link to="/join"> Register</Link>
              </span>
            </div>
          </div>
          <form>
            <p className="title">access your account</p>
            <p className="paragraph">
              To aceess Your Account, You Have To Provide <br />
              All These Information Below
            </p>

            <div className="fields row w-100">
              <div className="item input_hover col-sm-12">
                <input
                  type="text"
                  className="w-100"
                  required
                  placeholder="Your Username"
                  id="username"
                />
              </div>
              <div className="item input_hover col-sm-12">
                <input
                  type="password"
                  className="w-100"
                  required
                  placeholder="Your Password"
                  id="password"
                />
              </div>
            </div>
            <button className="btn_signup w-100" onClick={loginBtn}>
              sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
  // Parent Container Ends;
}

export default Access;
