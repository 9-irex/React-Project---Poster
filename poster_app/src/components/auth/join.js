import React from "react";
import "./auth.css";
import { Link } from "react-router-dom";

function Join() {
  return (
    <div class="__container">
      <div class="wrapper">
        <div class="left__box">
          <div class="pattern"></div>
          <div class="__content">
            <div class="wrapper">
              <div class="top__content">
                <div class="brand__logo">
                  <div class="logo__icon">
                    <img src="./Images/SVG/logo.svg" alt="" />
                  </div>
                  <span class="logo__name">poster</span>
                </div>
                <span class="link">
                  already have an account
                  <Link to="/access">Login</Link>
                </span>
              </div>
              <div class="bottom__content">
                <p class="title">welcome dear!</p>
                <p class="paragraph">
                  We Are Delighted To Have You Among Us. On Behalf Of
                  <br />
                  All The Members And The Management, We Would Like
                  <br />
                  To Extend Our Warmest Welcome And Good Wishes!
                </p>
                <div class="social_icon">
                  <div class="icon">
                    <img src="./Images/SVG/linkedin.svg" alt="Linkedin" />
                  </div>
                  <div class="icon">
                    <img src="./Images/SVG/github.svg" alt="GitHub" />
                  </div>
                  <div class="icon">
                    <img src="./Images/SVG/facebook.svg" alt="Facebook" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="right__box">
          <div class="top__bar">
            <div class="left__bar">
              <div class="brand__logo">
                <div class="logo__icon">
                  <img src="./Images/SVG/logo copy.svg" alt="" />
                </div>
                <span class="logo__name">poster</span>
              </div>
            </div>
            <div class="right__bar">
              <div class="social_icon">
                <div class="icon">
                  <img src="./Images/SVG/linkedin copy.svg" alt="Linkedin" />
                </div>
                <div class="icon">
                  <img src="./Images/SVG/github copy.svg" alt="GitHub" />
                </div>
                <div class="icon">
                  <img src="./Images/SVG/facebook copy.svg" alt="Facebook" />
                </div>
              </div>
              <span class="link">
                already have an account
                <Link to="/access">Login</Link>
              </span>
            </div>
          </div>

          <form>
            <p class="title">create new account</p>
            <p class="paragraph">
              To Create Your New Account, You Have To Provide <br />
              All These Information Below
            </p>

            <div class="fields row w-100">
              <div class="item input_hover col-sm-6">
                <input type="text" required placeholder="Your Name" />
              </div>
              <div class="item input_hover col-sm-6">
                <input type="email" required placeholder="Your Email" />
              </div>
              <div class="item input_hover col-sm-6">
                <input type="text" required placeholder="Your Phone" />
              </div>
              <div class="item input_hover col-sm-6">
                <select required>
                  <option value="">Select Gender</option>
                  <option value="1">Male Gender</option>
                  <option value="2">Female Gender</option>
                </select>
              </div>
              <div class="item input_hover col-sm-6">
                <input type="text" required placeholder="Your Username" />
              </div>
              <div class="item input_hover col-sm-6">
                <input type="password" required placeholder="Your Password" />
              </div>
              <div class="item input_hover col-sm-6">
                <input type="date" required placeholder="Your Brithday" />
              </div>
              <div class="item input_hover col-sm-6">
                <input type="date" required placeholder="Current Date" />
              </div>
            </div>
            <button class="btn_signup">sign up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Join;
