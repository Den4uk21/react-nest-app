import React from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { ChangeForgotPassForm } from '../../../components/auth/change-forgot-pass/changeForgotPassForm'
import { AuthActions } from '../../../redux/auth/actions'

export const ChangeForgotPassFormContainer: React.FC = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  
  const onSubmitValues = (password: string) => {
    dispatch(AuthActions.changeForgotPass({ token: location.search, password }))
  }

  return (
    <ChangeForgotPassForm onSubmitValues={onSubmitValues} />
  )
}