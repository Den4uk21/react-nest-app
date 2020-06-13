import { call, takeLatest } from 'redux-saga/effects'
import { Action } from 'redux-actions'
import { message } from 'antd'

import { SettingsActions } from './actions'
import { updateProfileApi } from './api'
import { IUpdateProfile } from '../../types/settings/types'

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

export default function* watchSettings() {
  yield takeLatest(SettingsActions.Type.UPDATE_PROFILE, UpdateProfileWorker)
}