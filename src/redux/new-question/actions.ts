import { createAction } from 'redux-actions'
import { INewQuestion } from '../../types/new-question/types'

enum Type {
  NEW_QUESTION = 'NEW_QUESTION'
}

const newQuestion = createAction<INewQuestion>(Type.NEW_QUESTION)

export const NewQuestionActions = {
  Type,

  newQuestion
}

export type NewQuestionActions = Omit<typeof NewQuestionActions, 'Type'>