import { createAction } from 'redux-actions'
import { IQuestion, IGetAnswerResponse, IGetAnswers, INewAnswer } from '../../types/question-answer/types'

enum Type {
  GET_QUESTION_INFO = 'GET_QUESTION_INFO',
  PUSH_QUESTION_INFO = 'PUSH_QUESTION_INFO',
  GET_ANSWERS = 'GET_ANSWERS',
  PUSH_ANSWERS = 'PUSH_ANSWERS',
  UPDATE_RATING = 'UPDATE_RATING',
  NEW_ANSWER = 'NEW_ANSWER'
}

const getQuestionInfo = createAction<string>(Type.GET_QUESTION_INFO)
const pushQuestionInfo = createAction<IQuestion>(Type.PUSH_QUESTION_INFO)
const getAnswers = createAction<IGetAnswers>(Type.GET_ANSWERS)
const pushAnswers = createAction<IGetAnswerResponse>(Type.PUSH_ANSWERS)
const updateRating = createAction<string>(Type.UPDATE_RATING)
const newAnswer = createAction<INewAnswer>(Type.NEW_ANSWER)

export const QuestionAnswerActions = {
  Type,

  getQuestionInfo,
  pushQuestionInfo,
  getAnswers,
  pushAnswers,
  updateRating,
  newAnswer
}

export type QuestionAnswerActions = Omit<typeof QuestionAnswerActions, 'Type'>