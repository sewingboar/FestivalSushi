import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";

const Header = ({ location }) => {
  return location.pathname !== "/" ? (
    <div className="header">
      <div className="header__logo">
        <Link to="/">
          <img
            className="header__logo--desktop"
            src="img/logo_store.png"
            alt=""
          />
          <img className="header__logo--mobile" src="img/logo.png" alt="" />
        </Link>
      </div>
    </div>
  ) : null;
};

export default Header;
