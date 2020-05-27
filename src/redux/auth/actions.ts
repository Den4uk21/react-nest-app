import { createAction } from 'redux-actions'
import { IRegister, ILogin } from '../../types/auth/types'

enum Type {
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  CONFIRM = 'CONFIRM',
}

const signUp = createAction<IRegister>(Type.SIGN_UP)
const signIn = createAction<ILogin>(Type.SIGN_IN)
const confirm = createAction<string>(Type.CONFIRM)

export const AuthActions = {
  Type,

  signIn,
  signUp,
  confirm
}

export type AuthActions = Omit<typeof AuthActions, 'Type'>