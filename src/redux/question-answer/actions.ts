import { createAction } from 'redux-actions'
import { IGetQuestion, IGetAnswer } from '../../types/question-answer/types'

enum Type {
  GET_QUESTION_INFO = 'GET_QUESTION_INFO',
  PUSH_QUESTION_INFO = 'PUSH_QUESTION_INFO',
  PUSH_ANSWERS = 'PUSH_ANSWERS',
  LOAD_QUESTION_INFO = 'LOAD_QUESTION_INFO'
}

const getQuestionInfo = createAction<string>(Type.GET_QUESTION_INFO)
const pushQuestionInfo = createAction<IGetQuestion>(Type.PUSH_QUESTION_INFO)
const pushAnswers = createAction<IGetAnswer>(Type.PUSH_ANSWERS)
const loadingQuestionInfo = createAction<boolean>(Type.LOAD_QUESTION_INFO)

export const QuestionAnswerActions = {
  Type,

  getQuestionInfo,
  pushQuestionInfo,
  pushAnswers,
  loadingQuestionInfo
}

export type QuestionAnswerActions = Omit<typeof QuestionAnswerActions, 'Type'>