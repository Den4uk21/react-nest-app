/* eslint-disable @typescript-eslint/no-namespace */
import { combineReducers } from 'redux'

import { MainReducer } from '../main/reducer'
import { QuestionAnswerReducer } from '../question-answer/reducer'
import { ProfileReducer } from '../profile/reducer'

import { IMainState } from '../../types/main/types'
import { IQuestionAnswerState } from '../../types/question-answer/types'
import { IProfileState } from '../../types/profile/types'

export interface IRootReducer {
  main: IMainState,
  question_answer: IQuestionAnswerState,
  profile: IProfileState
}

const rootReducer = combineReducers<IRootReducer>({
  main: MainReducer,
  question_answer: QuestionAnswerReducer,
  profile: ProfileReducer
})

export default rootReducer