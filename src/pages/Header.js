import React from "react";
import { FaBars } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import "./Header.css";
import { useDispatch } from "react-redux";
import { mailActions } from "../store/MailSlice";

const Header = () => {

  const dispatch = useDispatch();

  const handleSearchInputChange = (event) => {
    dispatch(mailActions.updateSearchQuery(event.target.value));
  };
  const showBarHandler = () =>{
    dispatch(mailActions.showSidebar());
  }

  return (
    <>
      <div className="header">
        <div className="header_left">
          <FaBars className="bars" onClick={showBarHandler}/>
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
            placeholder="search mail by your mail message(text)"
            onChange={handleSearchInputChange}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
