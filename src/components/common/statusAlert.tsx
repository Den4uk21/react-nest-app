import React from 'react'
import { useDispatch } from 'react-redux'
import { Alert, Button } from 'antd'
import { AuthActions } from '../../redux/auth/actions'

export const StatusAlert: React.FC = () => {
  const dispatch = useDispatch()

  const sendConfirm = () => {
    dispatch(AuthActions.sendConfirm())
  }

  return (
    <div className="status-alert">
      <Alert
        message="Warning! Your email is not confirmed!"
        description="Please confirm your email on the link from the letter. If there is no letter click on the button."
        type="warning"
        showIcon
      />

      <Button onClick={sendConfirm}>Send confirmation</Button>
    </div>
  )
}