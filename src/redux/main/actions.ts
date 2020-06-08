import { createAction } from 'redux-actions'
import { ILinkQuestionResponse, IFilterQuestions } from '../../types/main/types'

enum Type {
  GET_ALL_QUESTIONS = 'GET_ALL_QUESTIONS',
  PUSH_ALL_QUESTIONS = 'PUSH_ALL_QUESTIONS',
}

const getAllQuestions = createAction<IFilterQuestions>(Type.GET_ALL_QUESTIONS)
const pushAllQuestions = createAction<ILinkQuestionResponse>(Type.PUSH_ALL_QUESTIONS)

export const MainActions = {
  Type,

  getAllQuestions,
  pushAllQuestions
}

export type MainActions = Omit<typeof MainActions, 'Type'>