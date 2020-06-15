import React from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { ChangeEmailForm } from '../../../components/auth/change-email/changeEmailForm'
import { AuthActions } from '../../../redux/auth/actions'

export const ChangeEmailFormContainer: React.FC = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  
  const onSubmitValues = (email: string) => {
    dispatch(AuthActions.changeEmail({ token: location.search, email }))
  }

  return (
    <ChangeEmailForm onSubmitValues={onSubmitValues} />
  )
}