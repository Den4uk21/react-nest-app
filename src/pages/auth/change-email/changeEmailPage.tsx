import React from 'react'
import { ChangeEmailFormContainer } from '../../../containers/auth/change-email/changeEmailFormContainer'

import '../styles.sass'

const ChangeEmailPage: React.FC = () => {
  return (
    <main className="change-email-page auth">
      <ChangeEmailFormContainer />
    </main>
  )
}

export default ChangeEmailPage