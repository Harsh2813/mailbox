import React from 'react'
import MailPage from './MailPage'
import { useSelector } from 'react-redux'

const Inbox = () => {

    let inboxMails = useSelector((state) => state.mail.inbox);

  return (
    <>
      <MailPage emails={inboxMails} active='inbox'/>
    </>
  )
}

export default Inbox
