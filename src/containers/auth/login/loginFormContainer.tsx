import React from 'react'
import { useDispatch } from 'react-redux'

import { LoginForm } from '../../../components/auth/login/loginForm'
import { ILogin } from '../../../types/auth/types'
import { AuthActions } from '../../../redux/auth/actions'

export const LoginFormContainer: React.FC = () => {
  const dispatch = useDispatch()

  const onSubmitValues = (values: ILogin) => {
    dispatch(AuthActions.signIn(values))
  }

  return (
    <LoginForm onSubmitValues={onSubmitValues} />
  )
}