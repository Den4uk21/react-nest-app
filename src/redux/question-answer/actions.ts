import { createAction } from 'redux-actions'
import { IQuestion, IGetAnswerResponse, IGetAnswers } from '../../types/question-answer/types'

enum Type {
  GET_QUESTION_INFO = 'GET_QUESTION_INFO',
  PUSH_QUESTION_INFO = 'PUSH_QUESTION_INFO',
  GET_ANSWERS = 'GET_ANSWERS',
  PUSH_ANSWERS = 'PUSH_ANSWERS',
  UPDATE_RATING = 'UPDATE_RATING'
}

const getQuestionInfo = createAction<string>(Type.GET_QUESTION_INFO)
const pushQuestionInfo = createAction<IQuestion>(Type.PUSH_QUESTION_INFO)
const getAnswers = createAction<IGetAnswers>(Type.GET_ANSWERS)
const pushAnswers = createAction<IGetAnswerResponse>(Type.PUSH_ANSWERS)
const updateRating = createAction<string>(Type.UPDATE_RATING)

export const QuestionAnswerActions = {
  Type,

  getQuestionInfo,
  pushQuestionInfo,
  getAnswers,
  pushAnswers,
  updateRating,
}

export type QuestionAnswerActions = Omit<typeof QuestionAnswerActions, 'Type'>