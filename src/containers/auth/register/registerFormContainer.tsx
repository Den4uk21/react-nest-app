import React from 'react'
import { useDispatch } from 'react-redux'

import { RegisterForm } from '../../../components/auth/register/registerForm'
import { IRegister } from '../../../types/auth/types'
import { AuthActions } from '../../../redux/auth/actions'

export const RegisterFormContainer: React.FC = () => {
  const dispatch = useDispatch()

  const onSubmitValues = (values: IRegister) => {
    dispatch(AuthActions.signUp(values))
  }

  return (
    <RegisterForm onSubmitValues={onSubmitValues} />
  )
}