import React, { useEffect } from "react";
import "./HomePage.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MailPage from "./MailPage";
import Compose from "./Compose";
import { useSelector, useDispatch } from "react-redux";
import { mailActions } from "../store/MailSlice";
import MailDetail from "./MailDetail";
import Inbox from "./Inbox";
import Sent from "./Sent";

const HomePage = () => {
  const composeShow = useSelector((state) => state.mail.compose);
  const isAuth = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.userId);
  const sidebar = useSelector((state) => state.mail.sidebar);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSentMailHandler = async () => {
      console.log("fetchSentMail Triggere!!");
      try {
        const response = await fetch(
          `https://mailbox-760f6-default-rtdb.firebaseio.com/${userId}/sentmail.json`
        );
        if (!response.ok) {
          throw new Error("error in fetching Data");
        }
        const data = await response.json();
        for (let key in data) {
          dispatch(
            mailActions.sentMail({
              id: key,
              to: data[key].to,
              subject: data[key].subject,
              mail: data[key].mail,
              timestamp: data[key].timestamp
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSentMailHandler();
  }, [isAuth]);

  return (
    <>
      <Header />
      <div className="body">
        {sidebar && <Sidebar />}
        <Switch>
          <Route path="/mail/:mailbox/:mailId">
            <MailDetail />
          </Route>
          <Route path="/mail/inbox">
            <Inbox />
          </Route>
          <Route path="/mail/sent">
            <Sent />
          </Route>
        </Switch>
      </div>
      {composeShow && <Compose />}
    </>
  );
};

export default HomePage;
