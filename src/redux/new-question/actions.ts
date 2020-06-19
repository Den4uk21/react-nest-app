import { createAction } from 'redux-actions'
import { INewQuestion, IChangeQuestion } from '../../types/new-question/types'

enum Type {
  NEW_QUESTION = 'NEW_QUESTION',
  CHANGE_QUESTION = 'CHANGE_QUESTION',
  DELETE_QUESTION = 'DELETE_QUESTION'
}

const newQuestion = createAction<INewQuestion>(Type.NEW_QUESTION)
const changeQuestion = createAction<IChangeQuestion>(Type.CHANGE_QUESTION)
const deleteQuestion = createAction<string>(Type.DELETE_QUESTION)

export const NewQuestionActions = {
  Type,

  newQuestion,
  changeQuestion,
  deleteQuestion
}

export type NewQuestionActions = Omit<typeof NewQuestionActions, 'Type'>