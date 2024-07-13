import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import "./Compose.css";
import { Button } from "react-bootstrap";
import { mailActions } from "../store/MailSlice";
import { useDispatch, useSelector } from "react-redux";
import useSentMail from "../component/Hooks/useSentMail";

const Compose = () => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [mailText, setMailText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const userEmail = useSelector((state) => state.auth.userEmail);

  const dispatch = useDispatch();
  // Call the custom hook to get the function to send mail
  const sentMailHandler = useSentMail();

  const formSubmitHandler = async(event) => {
    event.preventDefault();

    let trimedEmail = to.replace(/[@.]/g, '');

    const mailData = {
      to: to,
      from: userEmail,
      subject: subject,
      mail: mailText,
      trimedEmail: trimedEmail,
      timestamp: new Date().toISOString(),
    };
    console.log(mailData)
    console.log(mailData.trimedEmail);

    setIsLoading(true);
    await sentMailHandler(mailData);
    setIsLoading(false);

    setTo('');
    setSubject('');
    setMailText('');
  };

  return (
    <>
      <div className="compose">
        <div className="compose_header">
          <div className="compose_header_left">
            <span>New Message</span>
          </div>
          <div className="compose_header_right">
            <IoCloseSharp onClick={() => dispatch(mailActions.composeHide())} />
          </div>
        </div>
        <form onSubmit={formSubmitHandler}>
          <div className="compose_body">
            <div className="compose_bodyForm">
              <input
                type="email"
                placeholder="To"
                onChange={(e) => setTo(e.target.value)}
                value={to}
                required
              />
              <input
                type="text"
                placeholder="Subject"
                onChange={(e) => setSubject(e.target.value)}
                value={subject}
              />
              <textarea
                rows="13"
                placeholder="if compose section is not visible properly please decrease you screen zoom"Z
                onChange={(e) => setMailText(e.target.value)}
                value={mailText}
              />
            </div>
          </div>
          <div className="compose_footer">
            {isLoading ? (
              <p>Sending...</p>
            ) : (
              <Button type="submit">Send</Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Compose;
