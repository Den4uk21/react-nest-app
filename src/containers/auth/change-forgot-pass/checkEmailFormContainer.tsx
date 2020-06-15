import React from 'react'
import { useDispatch } from 'react-redux'

import { CheckEmailForm } from '../../../components/auth/change-forgot-pass/checkEmailForm'
import { AuthActions } from '../../../redux/auth/actions'

export const CheckEmailFormContainer: React.FC = () => {
  const dispatch = useDispatch()
  
  const onSubmitValues = (email: string) => {
    dispatch(AuthActions.sendChangePass(email))
  }

  return (
    <CheckEmailForm onSubmitValues={onSubmitValues} />
  )
}