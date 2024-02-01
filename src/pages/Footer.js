import React from "react";
import { NavLink } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-10 mx-auto">
            <div className="row">
              <div className="col-6 col-lg-3">
                <h2>Company</h2>
                <ul>
                  <NavLink to="#">About</NavLink>
                  <NavLink to="#">About</NavLink>
                  <NavLink to="#">About</NavLink>
                  <NavLink to="#">About</NavLink>
                </ul>
              </div>
              <div className="col-6 col-lg-3">
                <h2>Company</h2>
                <ul>
                  <NavLink to="#">About</NavLink>
                  <NavLink to="#">About</NavLink>
                  <NavLink to="#">About</NavLink>
                  <NavLink to="#">About</NavLink>
                </ul>
              </div>
              <div className="col-6 col-lg-3">
                <h2>Company</h2>
                <ul>
                  <NavLink to="#">About</NavLink>
                  <NavLink to="#">About</NavLink>
                  <NavLink to="#">About</NavLink>
                  <NavLink to="#">About</NavLink>
                </ul>
              </div>
              <div className="col-6 col-lg-3">
                <h2>Follow Us</h2>
                <div className="row">
                  <div className=" mx-auto">
                    <NavLink>
                      Facebook
                      <i className="fab fa-facebook-f fontawesome-style"></i>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="mt-5">
              <p className="main-hero-para text-center w-100">
                Copyright @ 2021 PayMe. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
