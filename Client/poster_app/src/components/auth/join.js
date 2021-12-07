import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function Join() {
  const history = useHistory();
  const location = useLocation();
  const [isLogged, setLogged] = useState(
    sessionStorage.getItem("loggedStatus")
  );

  const registerBtn = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/v1/poster/register", {
        Name: document.getElementById("name").value,
        Email: document.getElementById("email").value,
        Phone: document.getElementById("phone").value,
        Gender: document.getElementById("gender").value,
        Birthday: document.getElementById("birthdate").value,
        Username: document.getElementById("username").value,
        Password: document.getElementById("password").value,
        Status: "Active",
        Avatar: document.getElementById("name").value[0],
        Date: document.getElementById("date").value,
        Type: "Register",
      })
      .then((res) => {
        if (res.data.Message !== "User Registered") {
          alert(res.data.Message);
        } else {
          window.location.href = "/access";
        }
      });
  };

  useEffect(() => {
    setLogged(sessionStorage.getItem("loggedStatus"));
  }, [location]);

  isLogged && history.push("/");
  return (
    <div className="__auth__container">
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
                  already have an account
                  <Link to="/access">Login</Link>
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
                already have an account
                <Link to="/access">Login</Link>
              </span>
            </div>
          </div>

          <form>
            <p className="title">create new account</p>
            <p className="paragraph">
              To Create Your New Account, You Have To Provide <br />
              All These Information Below
            </p>

            <div className="fields row w-100">
              <div className="item input_hover col-sm-6">
                <input type="text" required placeholder="Your Name" id="name" />
              </div>
              <div className="item input_hover col-sm-6">
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  id="email"
                />
              </div>
              <div className="item input_hover col-sm-6">
                <input
                  type="text"
                  required
                  placeholder="Your Phone"
                  id="phone"
                />
              </div>
              <div className="item input_hover col-sm-6">
                <select required id="gender">
                  <option value="">Select Gender</option>
                  <option value="Male">Male Gender</option>
                  <option value="Female">Female Gender</option>
                </select>
              </div>
              <div className="item input_hover col-sm-6">
                <input
                  type="text"
                  required
                  placeholder="Your Username"
                  id="username"
                />
              </div>
              <div className="item input_hover col-sm-6">
                <input
                  type="password"
                  required
                  placeholder="Your Password"
                  id="password"
                />
              </div>
              <div className="item input_hover col-sm-6">
                <span className="indicator">* Birthdate</span>
                <input
                  type="date"
                  required
                  placeholder="Your Brithday"
                  id="birthdate"
                />
              </div>
              <div className="item input_hover col-sm-6">
                <span className="indicator">* Date</span>
                <input
                  type="date"
                  required
                  placeholder="Current Date"
                  id="date"
                />
              </div>
            </div>
            <button className="btn_signup" onClick={registerBtn}>
              sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Join;
