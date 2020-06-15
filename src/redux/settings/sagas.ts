import { call, takeLatest } from 'redux-saga/effects'
import { Action } from 'redux-actions'
import { message } from 'antd'

import { SettingsActions } from './actions'
import { changeUsername } from '../assets/authApi'

import { updateProfileApi, changePassApi, updateUsernameApi, sendChangeEmailApi } from './api'
import { IUpdateProfile, IChangePassword, IUpdateUsername } from '../../types/settings/types'

function* UpdateProfileWorker(action: Action<IUpdateProfile>) {
  try {
    const { status, data } = yield call(updateProfileApi, action.payload)
   
    if(status === 200) {
      message.success('Profile successfully updated!')
    }else {
      message.error(data.message)
    }
  }catch(err) {
    message.error('Failed to update profile!')
    console.log(err)
  }
}

function* UpdateUsernameWorker(action: Action<IUpdateUsername>) {
  try {
    const { status, data } = yield call(updateUsernameApi, action.payload)
   
    if(status === 200) {
      message.success('Username successfully updated!')
      yield call(changeUsername, action.payload.userName)
      window.location.reload()
    }else {
      message.error(data.message)
    }
  }catch(err) {
    message.error('Failed to update username!')
    console.log(err)
  }
}

function* SendChangeEmailWorker() {
  try {
    const { status, data } = yield call(sendChangeEmailApi)
   
    if(status === 201) {
      message.success('Successfully sent email to change email!')
    }else {
      message.error(data.message)
    }
  }catch(err) {
    message.error('Failed to send change email!')
    console.log(err)
  }
}

function* ChangePassWorker(action: Action<IChangePassword>) {
  try {
    const { status, data } = yield call(changePassApi, action.payload)
   
    if(status === 200) {
      message.success('Password successfully changed!')
    }else {
      message.error(data.message)
    }
  }catch(err) {
    message.error('Failed to change password!')
    console.log(err)
  }
}

export default function* watchSettings() {
  yield takeLatest(SettingsActions.Type.UPDATE_PROFILE, UpdateProfileWorker)
  yield takeLatest(SettingsActions.Type.UPDATE_USERNAME, UpdateUsernameWorker)
  yield takeLatest(SettingsActions.Type.SEND_CHANGE_EMAIL, SendChangeEmailWorker)
  yield takeLatest(SettingsActions.Type.CHANGE_PASSWORD, ChangePassWorker)
}