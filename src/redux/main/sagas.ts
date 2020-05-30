import { call, takeLatest, put } from 'redux-saga/effects'
import { Action } from 'redux-actions'
import { message } from 'antd'

import { MainActions } from './actions'
import { getAllQuestionsApi } from './api'

import { IFilterQuestions } from '../../types/main/types'

function* GetAllQuestionsWorker(action: Action<IFilterQuestions>) {
  try {
    const { status, data } = yield call(getAllQuestionsApi, action.payload)
   
    if(status === 201) {
      yield put(MainActions.pushAllQuestions(data))
    }else {
      message.error(data.message)
    }
  }catch(err) {
    message.error('Failed to get questions')
    console.log(err)
  }
}

export default function* watchMain() {
  yield takeLatest(MainActions.Type.GET_ALL_QUESTIONS, GetAllQuestionsWorker)
}