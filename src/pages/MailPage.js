import React from "react";
import "./HomePage.css";
import { useHistory } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";

const MailPage = ({ emails, active }) => {
  const history = useHistory();

  const mailClickHandler = (mail) => {
    history.push(`/mail/${active}/${mail.id}`);
  };

  const deleteParticularMail = async(id) => {
    try{
      const response = await fetch(`https://mailbox-760f6-default-rtdb.firebaseio.com/${userId}/sentmail/${id}.json`, {
      method: 'DELETE'
    });
    if(!response.ok){
      throw new Error('Error in deleting')
    }
    }catch(error){
      console.log(error);
    }
  }

  return (
    <>
      <div className="emailPage">
        {emails.map((email) => (
          <div
            key={email.id}
            className="emailItem"
            onClick={() => mailClickHandler(email)}
          >
            <div className="emailDetail">
              {active === "sent" ? (
                <p className="emailId">{email.to}</p>
              ) : (
                <p className="emailId">{email.from}</p>
              )}
            </div>
            <p className="email_subject">{email.subject} - </p>{" "}
            <p className="mailText">{email.mail}</p>
            <div className="deleteIcon">
              <RiDeleteBinLine onClick={()=> deleteParticularMail(email.id)}/>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MailPage;
