import { createAction } from 'redux-actions'
import { INewAnswer, IChangeAnswer, IIsAnswer } from '../../types/new-answer/types'

enum Type {
  UPDATE_RATING = 'UPDATE_RATING',
  NEW_ANSWER = 'NEW_ANSWER',
  CHANGE_ANSWER = 'CHANGE_ANSWER',
  DELETE_ANSWER = 'DELETE_ANSWER',
  IS_ANSWER = 'IS_ANSWER'
}

const updateRating = createAction<string>(Type.UPDATE_RATING)
const newAnswer = createAction<INewAnswer>(Type.NEW_ANSWER)
const changeAnswer = createAction<IChangeAnswer>(Type.CHANGE_ANSWER)
const deleteAnswer = createAction<string>(Type.DELETE_ANSWER)
const isAnswer = createAction<IIsAnswer>(Type.IS_ANSWER)

export const NewAnswerActions = {
  Type,

  updateRating,
  newAnswer,
  changeAnswer,
  deleteAnswer,
  isAnswer
}

export type NewAnswerActions = Omit<typeof NewAnswerActions, 'Type'>