import React, { useEffect } from "react";
import AuthForm from "./pages/AuthForm";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";
import useFetchInbox from "./component/Hooks/useFetchInbox";


const App = () => {
  const isAuth = useSelector((state) => state.auth.isLoggedIn);
  useFetchInbox();

  return (
    <>
      <Switch>
        <Route exact path="/">
          {isAuth ? <HomePage /> : <Redirect to="/auth" />}
        </Route>
        <Route path="/mail">
          {isAuth ? <HomePage /> : <Redirect to="/auth" />}
        </Route>
        {!isAuth && (
          <Route path="/auth">
            <AuthForm />
          </Route>
        )}
      </Switch>
    </>
  );
};

export default App;
