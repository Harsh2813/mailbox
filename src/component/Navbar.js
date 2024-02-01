import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from '../../src/store/AuthSlice';

const NavBar = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isLoggedIn);


  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand style={{ fontSize: "2rem" }}>
            Mail Box
          </Navbar.Brand>
          <Nav className="me-auto">
            {isAuth && (
              <Link to="/" className="nav-link">
                Home
              </Link>
            )}
            {isAuth && (
              <Link to="/about" className="nav-link">
                About
              </Link>
            )}
            {isAuth && (
              <Link to="/contactUs" className="nav-link">
                ContactUs
              </Link>
            )}
            {isAuth && (
              <Link to="/mail" className="nav-link">
                Mail
              </Link>
            )}
            {!isAuth && (
              <Link to="/auth" className="nav-link">
                Login
              </Link>
            )}
            {isAuth && (
              <Button
                variant="outline-secondary"
                style={{ marginLeft: "600px" }}
                onClick={() => logoutHandler()}
              >
                Logout
              </Button>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
