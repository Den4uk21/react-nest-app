import React from 'react'
import { LoginFormContainer } from '../../../containers/auth/login/loginFormContainer'

const LoginPage: React.FC = () => {
  return (
    <main className="login-page" >
      <LoginFormContainer />
    </main>
  )
}

export default LoginPage