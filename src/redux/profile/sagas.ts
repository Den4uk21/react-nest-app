import { call, takeLatest, put } from 'redux-saga/effects'
import { Action } from 'redux-actions'
import { message } from 'antd'

import { ProfileActions } from './actions'
import { getProfileApi, getUserQuestionsWithAnswersApi, getUserQuestionsNoAnswersApi } from './api'

import { IGetUserQuestions } from '../../types/profile/types'

function* GetProfileWorker(action: Action<string>) {
  try {
    const { status, data } = yield call(getProfileApi, action.payload)
   
    if(status === 200) {
      yield put(ProfileActions.pushProfile(data))
    }else {
      message.error(data.message)
    }
  }catch(err) {
    message.error('Failed to get profile')
    console.log(err)
  }
}

function* GetUserQuestionsWithAnswersWorker(action: Action<IGetUserQuestions>) {
  try {
    const { status, data } = yield call(getUserQuestionsWithAnswersApi, action.payload)
   
    if(status === 200) {
      yield put(ProfileActions.pushUserQuestionsWithAnswers(data))
    }else {
      message.error(data.message)
    }
  }catch(err) {
    message.error('Failed to get profile')
    console.log(err)
  }
}

function* GetUserQuestionsNoAnswersWorker(action: Action<IGetUserQuestions>) {
  try {
    const { status, data } = yield call(getUserQuestionsNoAnswersApi, action.payload)
   
    if(status === 200) {
      yield put(ProfileActions.pushUserQuestionsNoAnswers(data))
    }else {
      message.error(data.message)
    }
  }catch(err) {
    message.error('Failed to get profile')
    console.log(err)
  }
}

export default function* watchProfile() {
  yield takeLatest(ProfileActions.Type.GET_PROFILE, GetProfileWorker)
  yield takeLatest(ProfileActions.Type.GET_USER_QUESTIONS_WITH_ANSWERS, GetUserQuestionsWithAnswersWorker)
  yield takeLatest(ProfileActions.Type.GET_USER_QUESTIONS_NO_ANSWERS, GetUserQuestionsNoAnswersWorker)
}