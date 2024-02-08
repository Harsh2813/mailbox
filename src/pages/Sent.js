import React from 'react'
import MailPage from './MailPage'
import { useSelector } from 'react-redux'

const Sent = () => {

    let sentMails = useSelector((state) => state.mail.sent);

  return (
    <>
      <MailPage emails={sentMails} active='sent'/>
    </>
  )
}

export default Sent
