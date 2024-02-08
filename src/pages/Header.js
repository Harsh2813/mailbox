import React from "react";
import { FaBars } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import "./Header.css";

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="header_left">
          <FaBars />
          <img
            className="img"
            src="../../images/gmail.png"
            alt="Gmail Logo"
            width="100"
            height="40"
          />
        </div>
        <div className="header_middle">
          <div className="search_icon">
            <GoSearch />
          </div>
          <input
            className="header_input"
            type="text"
            placeholder="search mail"
          />
        </div>
      </div>
    </>
  );
};

export default Header;
