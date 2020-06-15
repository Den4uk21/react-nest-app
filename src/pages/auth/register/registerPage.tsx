import React from 'react'
import { RegisterFormContainer } from '../../../containers/auth/register/registerFormContainer'

import '../styles.sass'

const RegisterPage: React.FC = () => {
  return (
    <main className="register-page auth">
      <RegisterFormContainer />
    </main>
  )
}

export default RegisterPage