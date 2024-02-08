import React, { useEffect } from "react";
import AuthForm from "./pages/AuthForm";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useSelector, useDispatch } from "react-redux";
import MailDetail from "./pages/MailDetail";
import { mailActions } from "./store/MailSlice";

const App = () => {
  const isAuth = useSelector((state) => state.auth.isLoggedIn);
  const userEmail = useSelector((state) => state.auth.userEmail);
  const dispatch = useDispatch();

  let trimmedUserEmail = userEmail.replace(/[@.]/g, '');

  useEffect(() => {
    const fetchInboxMailHandler = async () => {
      console.log("useEffect fetchInboxMailHandler triggered!!!");
      try {
        const response = await fetch(
          `https://mailbox-760f6-default-rtdb.firebaseio.com/${trimmedUserEmail}/mail.json`
        );
        if (!response.ok) {
          throw new Error("error in fetching Data");
        }
        const data = await response.json();
        console.log(data);
        for (let key in data) {
          dispatch(
            mailActions.inboxMail({
              id: key,
              from: data[key].from,
              subject: data[key].subject,
              mail: data[key].mail,
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (isAuth) {
      fetchInboxMailHandler();
    }
  }, [isAuth]);

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
