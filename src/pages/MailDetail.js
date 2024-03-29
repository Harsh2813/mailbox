import { useSelector } from "react-redux";
import { IoArrowBackOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { useHistory, useParams } from "react-router-dom";
import "./HomePage.css";

const MailDetail = () => {
  const history = useHistory();
  const { mailbox, mailId } = useParams();

  const inboxMails = useSelector((state) => state.mail.inbox);
  const sentMails = useSelector((state) => state.mail.sent);

  // Find the mail with the specified mailId
  const mail =
    mailbox === "inbox"
      ? inboxMails.find((mail) => mail.id === mailId)
      : sentMails.find((mail) => mail.id === mailId);
  return (
    <>
      <div className="maildetail">
        <div className="maildetail_options">
          <IoArrowBackOutline onClick={(e) => history.goBack()} /> Back
        </div>
        <div className="maildetail_header">
          <h4>{mail ? mail.subject : "Loading..."}</h4>
        </div>
        <div className="mailBody">
          <div className="maildetail_middleHeader">
            {mailbox === "sent" ? (
              <p>{mail ? mail.to : "Loading..."}</p>
            ) : (
              <p>{mail ? mail.from : "Loading..."}</p>
            )}
          </div>
          <div className="maildetail_body">
            <p>{mail ? mail.mail : "Loading..."}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MailDetail;
