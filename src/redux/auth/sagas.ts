import { call, takeLatest, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { Action } from 'redux-actions'
import { message } from 'antd'

import { AuthActions } from './actions'
import { IRegister, ILogin } from '../../types/auth/types'

import { signUpApi, signInApi, confirmApi } from './api'
import { saveTokens } from '../assets/authApi'

function* SignUpWorker(action: Action<IRegister>) {
  try {
    const { status, data } = yield call(signUpApi, action.payload)
    console.log(status, data)
    if(status === 201) {
      yield put(push('/auth/success'))
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
      yield window.location.href = '/'
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

    if(status !== 200) {
      message.error(data.message)
    }

    yield put(push('/'))
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