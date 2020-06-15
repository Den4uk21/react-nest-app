import React from 'react'
import { ChangeForgotPassFormContainer } from '../../../containers/auth/change-forgot-pass/changeForgotPassFormContainer'

import '../styles.sass'

const ChangeForgotPassPage: React.FC = () => {
  return (
    <main className="change-forgot-pass-page auth">
      <ChangeForgotPassFormContainer />
    </main>
  )
}

export default ChangeForgotPassPage