import React from 'react'
import { useLocation} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Result, Button } from 'antd'

import { AuthActions } from '../../../redux/auth/actions'

const ConfirmPage: React.FC = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  
  const confirmClick = () => {
    dispatch(AuthActions.confirm(location.search))
  }

  return (
    <Result 
      status="info"
      title="Confirm your account!"
      subTitle="By confirming your account, you get full access to it!"
      extra={[
        <Button
          type="primary"
          key="console"
          onClick={confirmClick}
        >
          Confirm
        </Button>
      ]}
    />
  )
}

export default ConfirmPage