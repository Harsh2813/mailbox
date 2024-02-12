import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../store/MailSlice";

const useSentMail = (mailData) => {
  console.log(mailData)
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  return async (mailData) => {
    console.log(mailData);
    console.log(mailData.trimedEmail);
    let sentTo = mailData.trimedEmail;
    try {
      //for sending mail to that user, ye fn hm isiliye use kr rhe taki hm fetch me jisko mail send krna h uski id se api call kare taki wo user login me apni id daale to wahi bs usko show ho jisme uski id use hui fetch me
      const response1 = await fetch(
        `https://mailbox-760f6-default-rtdb.firebaseio.com/${sentTo}/mail.json`,
        {
          method: "POST",
          body: JSON.stringify(mailData),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response1.ok) {
        throw new Error("Unable to sent mail!!");
      }
      const data1 = await response1.json();
      console.log(data1);
      //for storing to our sent box only our sent mails, ye fn isiliye taki jo hmne send mail kiye h use hme wapas apne sent section me chahiye to hm localId use karenge yha apni taki apne bs sent wale dikhe ni to server me sabke sent wale dikhne lagenge isiliye hmne dono fn ko sath me call kiye aur iska name sentmail liye uper wale ka mail bs.
      const response2 = await fetch(
        `https://mailbox-760f6-default-rtdb.firebaseio.com/${userId}/sentmail.json`,
        {
          method: "POST",
          body: JSON.stringify(mailData),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response2.ok) {
        throw new Error("Unable to store sent mail!!");
      }
      const data2 = await response2.json();
      dispatch(mailActions.sentMail({ id: data2.name, ...mailData })); //data is object ke andar object to hm data ke andar ka object copy kr lete pr hm sentMail me object hi pass kr rhe id deke to array me object ke andar mailData object ho jate isiliye hmne data na leke direct mailData object ki properties copy ki aur id leke ek hi object sentMail ko diye to array of object ho jayega ab array mailSlice me.
      console.log(data2);
    } catch (error) {
      console.log("error", error);
    }
  };
};

export default useSentMail;
