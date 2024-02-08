import React from "react";
import "./SidebarOptions.css";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../store/MailSlice";
import { authActions } from "../store/AuthSlice";


const SidebarOptions = ({Icon, title, total }) => {

  const dispatch = useDispatch();
  const activeOption = useSelector((state) => state.mail.activeOption);

  let isactive;
  const sideBarOptionHandler = () => {
    if(title === 'inbox'){
      dispatch(mailActions.inboxActive());
      isactive = true;
    }
    if(title === 'sent'){
      dispatch(mailActions.sentActive());
      isactive = true;
    }
    if(title === 'Logout'){
      dispatch(authActions.logout());
      dispatch(mailActions.deleteInbox());
      dispatch(mailActions.deleteSent());
      dispatch(mailActions.inboxActive());
    }
  }

  return (
    <>
      <div className={`sidebarOptions ${activeOption === title.toLowerCase() && 'sidebarOptions_active'}`} onClick={sideBarOptionHandler}>
        <Icon/>
        <h4>{title}</h4>
        <p>{total}</p>
      </div>
    </>
  )
}

export default SidebarOptions;
