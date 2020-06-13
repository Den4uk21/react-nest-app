import { call, takeLatest } from 'redux-saga/effects'
import { Action } from 'redux-actions'
import { message } from 'antd'

import { AuthActions } from './actions'
import { IRegister, ILogin } from '../../types/auth/types'

import { signUpApi, signInApi, confirmApi } from './api'
import { saveTokens } from '../assets/authApi'

function* SignUpWorker(action: Action<IRegister>) {
  try {
    const { status, data } = yield call(signUpApi, action.payload)
    
    if(status === 201) {
      window.location.replace('/auth/success')
    }else {
      message.error(data.message)
    }
  }catch(err) {
    message.error('Failed to Sign Up')
    console.log(err)
  }
}

function* SignInWorker(action: Action<ILogin>) {
  try {
    const { status, data } = yield call(signInApi, action.payload)

    if(status === 201) {
      yield saveTokens(data)
      window.location.replace(`/profile/${JSON.parse(localStorage.auth_tokens).userName}`)
    }else {
      message.error(data.message)
    }
  }catch(err) {
    message.error('Failed to Sign In')
    console.log(err)
  }
}

function* ConfirmWorker(action: Action<string>) {
  try {
    const { status, data } = yield call(confirmApi, action.payload)

    if(status === 200) {
      window.location.replace('/')
    }else {
      message.error(data.message)
    }
  }catch(err) {
    message.error('Failed to Confirm Account!')
    console.log(err)
  }
}

export default function* watchAuth() {
  yield takeLatest(AuthActions.Type.SIGN_UP, SignUpWorker)
  yield takeLatest(AuthActions.Type.SIGN_IN, SignInWorker)
  yield takeLatest(AuthActions.Type.CONFIRM, ConfirmWorker)
}