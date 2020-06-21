import { call, takeLatest, put } from 'redux-saga/effects'
import { Action } from 'redux-actions'
import { message } from 'antd'

import { NewAnswerActions } from './actions'
import { QuestionAnswerActions } from '../question-answer/actions'

import { updateRatingApi, newAnswerApi, deleteAnswersApi, changeAnswerApi, isAnswersApi } from './api'
import { INewAnswer, IChangeAnswer, IIsAnswer } from '../../types/new-answer/types'

function* NewAnswerWorker(action: Action<INewAnswer>) {
  try {
    const { status, data } = yield call(newAnswerApi, action.payload)
    const questionId = window.location.pathname.split('/')[2]

    if(status === 201) {
      message.success('Answer created!')
      yield put(QuestionAnswerActions.getAnswers({ questionId }))
    }else {
      message.error(data.message)
    }
  }catch(err) {
    message.error('Failed to create answer!')
    console.log(err)
  }
}

function* UpdateRatingWorker(action: Action<string>) {
  try {
    const { status, data } = yield call(updateRatingApi, action.payload)

    if(status !== 200) {
      message.error(data.message)
    }
  }catch(err) {
    message.error('Failed to update rating!')
    console.log(err)
  }
}

function* ChangeAnswerWorker(action: Action<IChangeAnswer>) {
  try {
    const { status, data } = yield call(changeAnswerApi, action.payload)
    const questionId = window.location.pathname.split('/')[2]

    if(status === 200) {
      message.success('Answer changed!')
      yield put(QuestionAnswerActions.getAnswers({ questionId }))
    }else {
      message.error(data.message)
    }
  }catch(err) {
    message.error('Failed to change answer!')
    console.log(err)
  }
}

function* DeleteAnswerWorker(action: Action<string>) {
  try {
    const { status, data } = yield call(deleteAnswersApi, action.payload)
    const questionId = window.location.pathname.split('/')[2]

    if(status === 200) {
      message.success('Answer deleted!')
      yield put(QuestionAnswerActions.getAnswers({ questionId }))
    }else {
      message.error(data.message)
    }
  }catch(err) {
    message.error('Failed to delete answer!')
    console.log(err)
  }
}

function* IsAnswerWorker(action: Action<IIsAnswer>) {
  try {
    const { status, data } = yield call(isAnswersApi, action.payload)
    const questionId = window.location.pathname.split('/')[2]

    if(status === 200) {
      yield put(QuestionAnswerActions.getAnswers({ questionId }))
    }else {
      message.error(data.message)
    }
  }catch(err) {
    message.error('Failed to confirm answer!')
    console.log(err)
  }
}

export default function* watchNewAnswer() {
  yield takeLatest(NewAnswerActions.Type.UPDATE_RATING, UpdateRatingWorker)
  yield takeLatest(NewAnswerActions.Type.NEW_ANSWER, NewAnswerWorker)
  yield takeLatest(NewAnswerActions.Type.CHANGE_ANSWER, ChangeAnswerWorker)
  yield takeLatest(NewAnswerActions.Type.DELETE_ANSWER, DeleteAnswerWorker)
  yield takeLatest(NewAnswerActions.Type.IS_ANSWER, IsAnswerWorker)
}