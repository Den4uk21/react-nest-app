import { handleActions, Action } from 'redux-actions'
import { QuestionAnswerActions } from './actions'
import { IQuestionAnswerState, IQuestion, IGetAnswerResponse } from '../../types/question-answer/types'

const initialState: IQuestionAnswerState = {
  questionsInfo: null,
  answers: {
    answersList: [],
    amount: 1
  }
}

export const QuestionAnswerReducer = handleActions<IQuestionAnswerState, any>({
  [QuestionAnswerActions.Type.PUSH_QUESTION_INFO]: (state, action: Action<IQuestion>) => ({ ...state, questionsInfo: action.payload }),
  [QuestionAnswerActions.Type.PUSH_ANSWERS]: (state, action: Action<IGetAnswerResponse>) => ({ ...state, answers: action.payload })
}, initialState)