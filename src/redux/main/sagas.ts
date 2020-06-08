import { call, takeLatest, put, select } from 'redux-saga/effects'
import { message } from 'antd'

import { MainActions } from './actions'
import { getAllQuestionsApi } from './api'

import { IRootReducer } from '../store/rootReducer'

function* GetAllQuestionsWorker() {
  try {
    const payload = yield select((state: IRootReducer) => state.main.filter)
    const { status, data } = yield call(getAllQuestionsApi, payload)
   
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