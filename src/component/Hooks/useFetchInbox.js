import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { mailActions } from "../../store/MailSlice";

const useFetchInbox = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isLoggedIn);
  const userEmail = useSelector((state) => state.auth.userEmail);
  let trimmedUserEmail = userEmail.replace(/[@.]/g, "");

  const fetchInboxMailHandler = async () => {//we need to return something in custom hooks and this fn is not accessible outside of useEffect if create inside useEffect so we seprated useEffect and useFetchInbox returned this Handler fn.
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
      let totalUnread = 0;
      let dataArr = [];
      for (let key in data) {
        if (!data[key].read) {
          totalUnread++;
        }
        dataArr.push({
          id: key,
          from: data[key].from,
          subject: data[key].subject,
          mail: data[key].mail,
          timestamp: data[key].timestamp
        });
      }
      console.log(dataArr);
      dispatch(mailActions.inboxMail(dataArr));
      dispatch(mailActions.totalUnreadInbox(totalUnread));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (isAuth) {
        fetchInboxMailHandler();
        console.log('fetching inbox after 2 seconds');
      }
    }, 2000); // Fetch inbox emails every 2 seconds

    // Cleanup function to clear interval when component unmounts or isAuth changes
    return () => {
      clearInterval(interval);
    };
  }, [isAuth, dispatch, trimmedUserEmail]);;
  return fetchInboxMailHandler;
};

export default useFetchInbox;
