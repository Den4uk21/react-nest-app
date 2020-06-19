import { createAction } from 'redux-actions'
import { INewAnswer, IChangeAnswer } from '../../types/new-answer/types'

enum Type {
  UPDATE_RATING = 'UPDATE_RATING',
  NEW_ANSWER = 'NEW_ANSWER',
  CHANGE_ANSWER = 'CHANGE_ANSWER',
  DELETE_ANSWER = 'DELETE_ANSWER'
}

const updateRating = createAction<string>(Type.UPDATE_RATING)
const newAnswer = createAction<INewAnswer>(Type.NEW_ANSWER)
const changeAnswer = createAction<IChangeAnswer>(Type.CHANGE_ANSWER)
const deleteAnswer = createAction<string>(Type.DELETE_ANSWER)

export const NewAnswerActions = {
  Type,

  updateRating,
  newAnswer,
  changeAnswer,
  deleteAnswer
}

export type NewAnswerActions = Omit<typeof NewAnswerActions, 'Type'>