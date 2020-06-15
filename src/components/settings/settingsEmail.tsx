import React from 'react'
import { Button } from 'antd'
import { CheckCircleTwoTone, ExclamationCircleTwoTone } from '@ant-design/icons'

import './styles.sass'

interface SettingsEmailProps {
  email: string,
  status: string,
  onSendEmailChange: () => void
}

export const SettingsEmail: React.FC<SettingsEmailProps> = ({ email, status, onSendEmailChange }) => {
  const checkStatus = status === 'active' ? <CheckCircleTwoTone twoToneColor="#52c41a" className="status" /> : <ExclamationCircleTwoTone twoToneColor="#fadb14" className="status" />

  return (
    <section className="settings-email settings">
      <h1 className="title">Change Password</h1>
      <hr />

      <div className="email info">
        Your email: <b>{email}</b>
        {checkStatus}
      </div>

      <div className="details info">
        To change the email, click the button and go to your old mail. Follow the link and change the email.
      </div>

      <Button onClick={onSendEmailChange}>Send email verification</Button>
    </section>
  )
}