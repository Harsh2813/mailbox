import React from "react";
import AuthForm from "./pages/AuthForm";
import NavBar from "./component/Navbar";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from './pages/HomePage';
import About from './pages/About';
import { useSelector } from "react-redux";
import Footer from './pages/Footer';
import ContactUs from './pages/ContactUs';
import MailPage from "./pages/MailPage";

const App = () => {
  const isAuth = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
        <NavBar />
        <Switch>
          <Route exact path="/">
            {isAuth ? <HomePage /> : <Redirect to="/auth" />}
          </Route>
          <Route path="/about">
            {isAuth ? <About /> : <Redirect to="/auth" />}
          </Route>
          <Route path="/contactUs">
            {isAuth ? <ContactUs /> : <Redirect to="/auth" />}
          </Route>
          <Route path="/mail">
            {isAuth ? <MailPage /> : <Redirect to="/auth" />}
          </Route>
          {!isAuth && (
            <Route path="/auth">
              <AuthForm />
            </Route>
          )}
        </Switch>
        <Footer/>
    </>
  );
};

export default App;
