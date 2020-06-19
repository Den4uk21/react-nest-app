import { createAction } from 'redux-actions'
import { IRegister, ILogin, IChangeEmail, IChangeForgotPass } from '../../types/auth/types'

enum Type {
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  CONFIRM = 'CONFIRM',
  SEND_CONFIRM = 'SEND_CONFIRM',
  CHANGE_EMAIL = 'CHANGE_EMAIL',
  SEND_CHANGE_PASS = 'SEND_CHANGE_PASS',
  CHANGE_FORGOT_PASS = 'CHANGE_FORGOT_PASS'
}

const signUp = createAction<IRegister>(Type.SIGN_UP)
const signIn = createAction<ILogin>(Type.SIGN_IN)
const confirm = createAction<string>(Type.CONFIRM)
const sendConfirm = createAction(Type.SEND_CONFIRM)
const changeEmail = createAction<IChangeEmail>(Type.CHANGE_EMAIL)
const sendChangePass = createAction<string>(Type.SEND_CHANGE_PASS)
const changeForgotPass = createAction<IChangeForgotPass>(Type.CHANGE_FORGOT_PASS)

export const AuthActions = {
  Type,

  signIn,
  signUp,
  confirm,
  sendConfirm,
  changeEmail,
  sendChangePass,
  changeForgotPass
}

export type AuthActions = Omit<typeof AuthActions, 'Type'>