import React from 'react'
import { LoginFormContainer } from '../../../containers/auth/login/loginFormContainer'

import '../styles.sass'

const LoginPage: React.FC = () => {
  return (
    <main className="login-page auth">
      <LoginFormContainer />
    </main>
  )
}

export default LoginPage