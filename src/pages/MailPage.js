import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { useHistory } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../store/MailSlice";
import useFetchInbox from "../component/Hooks/useFetchInbox";

const MailPage = ({ emails, active }) => {
  const [readStatus, setReadStatus] = useState(
    JSON.parse(localStorage.getItem("readStatus")) || {}
  ); //we using this state just for checking if mail is unread then it should be bold otherwise normal aftre inbox read so we taken object for setting mail to true by its id
  const history = useHistory();
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.userEmail);
  const userId = useSelector((state) => state.auth.userId);

  const fetchUnreadMailHandler = useFetchInbox();//calling custom hook for fetching Total unread email also, we have to define hooks outside of anyother fn and its return value have to take like this

  let trimmedUserEmail = userEmail.replace(/[@.]/g, "");

  const mailClickHandler = async (mail) => {
    history.push(`/mail/${active}/${mail.id}`);

    if (active === "inbox" && !readStatus[mail.id]) {
      //jaise hi mail click karenge wo mail ka read true ho jayega
      await fetch(
        `https://mailbox-760f6-default-rtdb.firebaseio.com/${trimmedUserEmail}/mail/${mail.id}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({ read: true }),
        }
      );
      // Update read status in local state and local storage
      const updatedReadStatus = { ...readStatus, [mail.id]: true };
      setReadStatus(updatedReadStatus);
      localStorage.setItem("readStatus", JSON.stringify(updatedReadStatus));
    }
    fetchUnreadMailHandler();
  };
  //--------------above fetch api just for inbox mail seen so that increase or decrase inbox count -------------

  const deleteMailHandler = async (id, event) => {
    event.stopPropagation(); // Stop the propagation of the click event- ye jb use krte h jb parent element event ko call kiya ho pr jb child event to call kre to parent wala call na ho furhter jaise yha parent event mailClickHandler h to child onclick event deleteMailHandler ke baad mailClick events stop ho jaye hm ye isiliye use kr rhe bcoz jaise hi delete icon me click kiye to delete hone ke baad mailDetail page me ja rhe mailClick se
    try {
      if (active === "sent") {
        const response = await fetch(
          `https://mailbox-760f6-default-rtdb.firebaseio.com/${userId}/sentmail/${id}.json`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Error in deleting");
        }
      }
      if(active === 'inbox'){
        await fetch(
          `https://mailbox-760f6-default-rtdb.firebaseio.com/${trimmedUserEmail}/mail/${id}.json`,
          {
            method: "DELETE",
          }
        );
      }
      dispatch(mailActions.deleteMail(id)); // Update Redux state to remove the deleted mail from inbox
      fetchUnreadMailHandler();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="emailPage">
        {emails && emails.map((email) => (
          <div
            key={email.id}
            className={`emailItem ${
              active === "inbox" && !readStatus[email.id] ? "unread" : ""
            }`}
            onClick={() => mailClickHandler(email)}
          >
            <div className="emailDetail">
              {active === "sent" ? (
                <p className="emailId">{email.to}</p>
              ) : (
                <p className="emailId">{email.from}</p>
              )}
            </div>
            <p className="email_subject">{email.subject} - </p>
            <p className="mailText">{email.mail}</p>
            <p className="email_timestamp">{new Date(email.timestamp).toLocaleString()}</p>
            <div className="deleteIcon">
            <RiDeleteBinLine onClick={(event) => deleteMailHandler(email.id, event)} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default MailPage;