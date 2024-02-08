import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import "./Compose.css";
import { Button } from "react-bootstrap";
import { mailActions } from "../store/MailSlice";
import { useDispatch, useSelector } from "react-redux";

const Compose = () => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [mailText, setMailText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isAuth = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.userId);
  const userEmail = useSelector((state) => state.auth.userEmail);
  let trimmedUserEmail = userEmail.replace(/[@.]/g, '');

  const dispatch = useDispatch();

  let trimedEmail;
  const sentMailHandler = async (mailData) => {//for sending mail to that user
    try{
      setIsLoading(true)
      const response = await fetch(`https://mailbox-760f6-default-rtdb.firebaseio.com/${trimedEmail}/mail.json`, {
        method: 'POST',
        body: JSON.stringify(mailData),
        headers: {'Content-Type' : 'application/json'}
      })
      if(!response.ok){
        throw new Error('Unable to sent mail!!')
      }
      const data = await response.json();
      console.log(data);
    }catch(error){
      console.log('error', error);
    }finally{setIsLoading(false)}
  }

  const sentMailSetToSent = async (mailData) => {//for storing to our sent box only our sent mails 
    try{
      setIsLoading(true)
      const response = await fetch(`https://mailbox-760f6-default-rtdb.firebaseio.com/${userId}/sentmail.json`, {
        method: 'POST',
        body: JSON.stringify(mailData),
        headers: {'Content-Type' : 'application/json'}
      })
      if(!response.ok){
        throw new Error('Unable to sent mail!!')
      }
      const data = await response.json();
      dispatch(mailActions.sentMail({id: data.name, ...mailData}))//data is object ke andar object to hm data ke andar ka object copy kr lete pr hm sentMail me object hi pass kr rhe id deke to array me object ke andar mailData object ho jate isiliye hmne data na leke direct mailData object ki properties copy ki aur id leke ek hi object sentMail ko diye to array of object ho jayega ab array mailSlice me.
      console.log(data);
    }catch(error){
      console.log('error', error);
    }finally{setIsLoading(false)}
  }




  const formSubmitHandler = (event) => {
    event.preventDefault();

    trimedEmail = to.replace(/[@.]/g, '');

    const mailData = {
      to: to,
      from: userEmail,
      subject: subject,
      mail: mailText,
      trimedEmail: trimedEmail,
    };
    sentMailHandler(mailData);//ye fn hm isiliye use kr rhe taki hm fetch me jisko mail send krna h uski id se api call kare taki wo user login me apni id daale to wahi bs usko show ho jisme uski id use hui fetch me

    sentMailSetToSent(mailData);// ye fn isiliye taki jo hmne send mail kiye h use hme wapas apne sent section me chahiye to hm localId use karenge yha apni taki apne bs sent wale dikhe ni to server me sabke sent wale dikhne lagenge isiliye hmne dono fn ko sath me call kiye aur iska name sentmail liye uper wale ka mail bs.
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
                rows="18"
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
