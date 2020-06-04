import { call, takeLatest, put } from 'redux-saga/effects'
import { Action } from 'redux-actions'
import { message } from 'antd'

import { QuestionAnswerActions } from './actions'
import { getQuestionInfoApi, getAnswersApi } from './api'

function* GetQuestionAnswerWorker(action: Action<string>) {
  try {
    yield put(QuestionAnswerActions.loadingQuestionInfo(true))
    const question = yield call(getQuestionInfoApi, action.payload)
    const answers = yield call(getAnswersApi , action.payload)
   
    if(question.status === 200 && answers.status === 200) {
      yield put(QuestionAnswerActions.pushQuestionInfo(question.data))
      yield put(QuestionAnswerActions.pushAnswers(answers.data))
      yield put(QuestionAnswerActions.loadingQuestionInfo(false))
    }else {
      if(question.data.message) message.error(question.data.message)
      if(answers.data.message) message.error(answers.data.message)
    }
  }catch(err) {
    message.error('Failed to get question and answers')
    console.log(err)
  }
}

export default function* watchQuestionAnswer() {
  yield takeLatest(QuestionAnswerActions.Type.GET_QUESTION_INFO, GetQuestionAnswerWorker)
}