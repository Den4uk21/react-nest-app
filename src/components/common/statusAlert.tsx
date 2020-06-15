import React from 'react'
import { Alert, Button } from 'antd'

export const StatusAlert: React.FC = () => {
  return (
    <div className="status-alert">
      <Alert
        message="Warning! Your email is not confirmed!"
        description="Please confirm your email on the link from the letter. If there is no letter click on the button."
        type="warning"
        showIcon
      />

      <Button>Send confirmation</Button>
    </div>
  )
}