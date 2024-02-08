import React from "react";
import { Button } from "react-bootstrap";
import { GoPlus } from "react-icons/go";
import './Sidebar.css';
import SidebarOptions from "./SidebarOptions";
import { BiSolidInbox, BiSend } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import { IoDocumentOutline } from "react-icons/io5";
import { mailActions } from "../store/MailSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";


const Sidebar = () => {

  const dispatch = useDispatch();
  const totalInbox = useSelector((state) => state.mail.totalInbox);
  const totalSent = useSelector((state) => state.mail.totalSent);

  return (
    <>
      <div className="sidebar">
        <Button className="compose_btn" onClick={()=> dispatch(mailActions.composeShow())}>
          <GoPlus />
          Compose
        </Button>
        <NavLink to='/mail/inbox'><SidebarOptions Icon={BiSolidInbox} title='inbox' total={totalInbox}/></NavLink>
        <NavLink to='/mail/sent'><SidebarOptions Icon={BiSend } title='sent' total={totalSent}/></NavLink>
        <SidebarOptions Icon={IoDocumentOutline} title='draft'/>
        <SidebarOptions Icon={BiLogOut} title='Logout'/>
      </div>
    </>
  );
};

export default Sidebar;
