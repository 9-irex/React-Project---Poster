import React from "react";

function Nav() {
  return (
    <div className="navigation__side">
      <div>
        <div className="logo">
          <img src="/Images/SVG/logo.svg" alt="Logo" />
        </div>
        <div className="icon active">
          <i className="fa fa-home"></i>
        </div>
        <div className="icon">
          <i className="fa fa-comment"></i>
        </div>
      </div>
      <div>
        <div className="icon">
          <i className="fa fa-cog"></i>
        </div>
        <div className="indicator">
          <div className="profile">
            <img src="/Images/Random/five.jpg" alt="Preview" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
