import React from "react";
import "./Header.scss";
const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-content__search">
          <label htmlFor="header-search">
            <img
              src={`${process.env.PUBLIC_URL}/assets/header-search.svg`}
              alt="search"
            />
          </label>
          <input type="text" id="header-search" placeholder="Поиск" />
        </div>
        <div className="header-content__notification">
          <img
            src={`${process.env.PUBLIC_URL}/assets/Bell.svg`}
            alt="notification"
          />
        </div>
        <div className="header-content__profile">
          <img
            src={`${process.env.PUBLIC_URL}/assets/header-profile-logo.png`}
            alt="profile-logo"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
