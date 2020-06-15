import React from 'react'
import { CheckEmailFormContainer } from '../../../containers/auth/change-forgot-pass/checkEmailFormContainer'

import '../styles.sass'

const CheckEmailPage: React.FC = () => {
  return (
    <main className="check-email-page auth">
      <CheckEmailFormContainer />
    </main>
  )
}

export default CheckEmailPage