import { createAction } from 'redux-actions'
import { IProfile, IGetUserQuestions } from '../../types/profile/types'
import { ILinkQuestionResponse } from '../../types/main/types'

enum Type {
  GET_PROFILE = 'GET_PROFILE',
  PUSH_PROFILE = 'PUSH_PROFILE',

  GET_USER_QUESTIONS_WITH_ANSWERS = 'GET_USER_QUESTIONS_WITH_ANSWERS',
  PUSH_USER_QUESTIONS_WITH_ANSWERS = 'PUSH_USER_QUESTIONS_WITH_ANSWERS',

  GET_USER_QUESTIONS_NO_ANSWERS = 'GET_USER_QUESTIONS_NO_ANSWERS',
  PUSH_USER_QUESTIONS_NO_ANSWERS = 'PUSH_USER_QUESTIONS_NO_ANSWERS'
}

const getProfile = createAction<string>(Type.GET_PROFILE)
const pushProfile = createAction<IProfile>(Type.PUSH_PROFILE)

const getUserQuestionsWithAnswers = createAction<IGetUserQuestions>(Type.GET_USER_QUESTIONS_WITH_ANSWERS)
const pushUserQuestionsWithAnswers = createAction<ILinkQuestionResponse>(Type.PUSH_USER_QUESTIONS_WITH_ANSWERS)

const getUserQuestionsNoAnswers = createAction<IGetUserQuestions>(Type.GET_USER_QUESTIONS_NO_ANSWERS)
const pushUserQuestionsNoAnswers = createAction<ILinkQuestionResponse>(Type.PUSH_USER_QUESTIONS_NO_ANSWERS)

export const ProfileActions = {
  Type,

  getProfile,
  pushProfile,
  getUserQuestionsWithAnswers,
  pushUserQuestionsWithAnswers,
  getUserQuestionsNoAnswers,
  pushUserQuestionsNoAnswers
}

export type ProfileActions = Omit<typeof ProfileActions, 'Type'>