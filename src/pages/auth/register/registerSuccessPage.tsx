import React from 'react'
import { Link } from 'react-router-dom'
import { Result, Button } from 'antd'

const RegisterSuccessPage: React.FC = () => {
  return (
    <Result 
      status="success"
      title="Success signed up!"
      subTitle="You have just created new account!"
      extra={[
        <Button
          type="primary"
          key="console"
        >
          <Link to="/login">Go to Login</Link>
        </Button>
      ]}
    />
  )
}

export default RegisterSuccessPage