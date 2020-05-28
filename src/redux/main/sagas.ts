import { call, takeLatest, put } from 'redux-saga/effects'
import { message } from 'antd'

import { MainActions } from './actions'
import { getAllQuestionsApi } from './api'

function* GetAllQuestionsWorker() {
  try {
    const { status, data } = yield call(getAllQuestionsApi)
   
    if(status === 200) {
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