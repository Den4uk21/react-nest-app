import { call, takeLatest, put } from 'redux-saga/effects'
import { Action } from 'redux-actions'
import { message } from 'antd'

import { QuestionAnswerActions } from './actions'
import { getQuestionInfoApi, getAnswersApi } from './api'

import { IGetAnswers } from '../../types/question-answer/types'

function* GetQuestionWorker(action: Action<string>) {
  try {
    const { status, data } = yield call(getQuestionInfoApi, action.payload)
   
    if(status === 200) {
      yield put(QuestionAnswerActions.pushQuestionInfo(data))
    }else {
      message.error(data.message)
    }
  }catch(err) {
    message.error('Failed to get question!')
    console.log(err)
  }
}

function* GetAnswersWorker(action: Action<IGetAnswers>) {
  try {
    const { status, data } = yield call(getAnswersApi, action.payload)

    if(status === 200) {
      yield put(QuestionAnswerActions.pushAnswers(data))
    }else {
      message.error(data.message)
    }
  }catch(err) {
    message.error('Failed to get answers!')
    console.log(err)
  }
}

export default function* watchQuestionAnswer() {
  yield takeLatest(QuestionAnswerActions.Type.GET_QUESTION_INFO, GetQuestionWorker)
  yield takeLatest(QuestionAnswerActions.Type.GET_ANSWERS, GetAnswersWorker)
}