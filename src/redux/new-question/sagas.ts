import { call, takeLatest, put } from 'redux-saga/effects'
import { Action } from 'redux-actions'
import { message } from 'antd'

import { NewQuestionActions } from './actions'
import { newQuestionsApi, deleteQuestionApi, changeQuestionApi } from './api'
import { INewQuestion, IChangeQuestion } from '../../types/new-question/types'
import { QuestionAnswerActions } from '../question-answer/actions'

function* NewQuestionWorker(action: Action<INewQuestion>) {
  try {
    const { status, data } = yield call(newQuestionsApi, action.payload)
   
    if(status === 201) {
      message.success('Question created!')
      window.location.replace(`/profile/${JSON.parse(localStorage.auth_tokens).userName}`)
    }else {
      message.error(data.message)
    }
  }catch(err) {
    message.error('Failed to create question!')
    console.log(err)
  }
}

function* ChangeQuestionWorker(action: Action<IChangeQuestion>) {
  try {
    const { status, data } = yield call(changeQuestionApi, action.payload)
    const questionId = window.location.pathname.split('/')[2]
   
    if(status === 200) {
      message.success('Question changed!')
      yield put(QuestionAnswerActions.getQuestionInfo(questionId))
    }else {
      message.error(data.message)
    }
  }catch(err) {
    message.error('Failed to change question!')
    console.log(err)
  }
}

function* DeleteQuestionWorker(action: Action<string>) {
  try {
    const { status, data } = yield call(deleteQuestionApi, action.payload)
   
    if(status === 200) {
      message.success('Question deleted!')
      window.location.replace('/')
    }else {
      message.error(data.message)
    }
  }catch(err) {
    message.error('Failed to delete question!')
    console.log(err)
  }
}

export default function* watchNewQuestion() {
  yield takeLatest(NewQuestionActions.Type.NEW_QUESTION, NewQuestionWorker)
  yield takeLatest(NewQuestionActions.Type.CHANGE_QUESTION, ChangeQuestionWorker)
  yield takeLatest(NewQuestionActions.Type.DELETE_QUESTION, DeleteQuestionWorker)
}