import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { useHistory } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../store/MailSlice";

const MailPage = ({ emails, active }) => {
  const [readStatus, setReadStatus] = useState(
    JSON.parse(localStorage.getItem("readStatus")) || {}
  ); //we using this state just for checking if mail is unread then it should be bold otherwise normal aftre inbox read so we taken object for setting mail to true by its id
  const history = useHistory();
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.userEmail);
  const userId = useSelector((state) => state.auth.userId);

  let trimmedUserEmail = userEmail.replace(/[@.]/g, "");

  const fetchUnreadMailHandler = async() => {
    try {
      //wapas fetch kiye taki jiske bhi read true ni h unka total count krke unread mail me show kiye
      const response = await fetch(
        `https://mailbox-760f6-default-rtdb.firebaseio.com/${trimmedUserEmail}/mail.json`
      );
      if (!response.ok) {
        throw new Error("error in fetching Data");
      }
      const data = await response.json();
      console.log(data);
      let totalUnread = 0;
      for (let key in data) {
        if (!data[key].read && !readStatus[key]) {
          totalUnread++;
        }
      }
      dispatch(mailActions.totalUnreadInbox(totalUnread));
    } catch (error) {
      console.log(error);
    }
  }

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
        {emails.map((email) => (
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

//Object.values(readStatus) extracts all the values from the readStatus object and returns them as an array. ex- readStatus is { "id1": true, "id2": false, "id3": true }, Object.values(readStatus) will return [true, false, true]. Now jo ye Object.value se true false mila usme filter lagaye aur each true false ko as a status denote kiye ab jo status false hoga wo hme filter ho jayega aur sare false ki length milegi last me aur wo return hoga mtlb total unread jiski readStatus false h uski length ya quantity uper as updatedReadStatus liye dispatch me
// console.log(readStatus);
// const calculateTotalUnread = (emails) => {
//   return emails.filter((email) => !readStatus[email.id]).length;
// }; //uper hmne updatedReadStatus pass kiya kyu ki us time readStatus update ni tha pr mailClick fn ke bahr hmne ye fn use kiya mtlb readStatus state update ho gyi to hmne yha liya.

// useEffect(() => {
//   //when we get back to page or reloads page we again set all state by getting from local storage
//   const initialReadStatus =
//     JSON.parse(localStorage.getItem("readStatus")) || {};
//   setReadStatus(initialReadStatus);
// }, [emails, active]);
