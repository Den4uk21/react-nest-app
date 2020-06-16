import { call, takeLatest } from 'redux-saga/effects'
import { Action } from 'redux-actions'
import { message } from 'antd'

import { NewQuestionActions } from './actions'
import { INewQuestion } from '../../types/new-question/types'
import { newQuestionsApi } from './api'

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

export default function* watchNewQuestion() {
  yield takeLatest(NewQuestionActions.Type.NEW_QUESTION, NewQuestionWorker)
}