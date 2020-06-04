/* eslint-disable @typescript-eslint/no-namespace */
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { MainReducer } from '../main/reducer'
import { QuestionAnswerReducer } from '../question-answer/reducer'

import { IMainState } from '../../types/main/types'
import { IQuestionAnswerState } from '../../types/question-answer/types'

export interface IRootReducer {
  router: any,
  main: IMainState,
  question_answer: IQuestionAnswerState
}

const rootReducer = combineReducers<IRootReducer>({
  router: routerReducer,
  main: MainReducer,
  question_answer: QuestionAnswerReducer
})

export default rootReducer