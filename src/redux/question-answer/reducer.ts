import { handleActions, Action } from 'redux-actions'
import { QuestionAnswerActions } from './actions'
import { IQuestionAnswerState, IGetQuestion, IGetAnswer } from '../../types/question-answer/types'

const initialState: IQuestionAnswerState = {
  questionsInfo: null,
  answersList: [],
  loading: true
}

export const QuestionAnswerReducer = handleActions<IQuestionAnswerState, any>({
  [QuestionAnswerActions.Type.PUSH_QUESTION_INFO]: (state, action: Action<IGetQuestion>) => ({ ...state, questionsInfo: action.payload }),
  [QuestionAnswerActions.Type.PUSH_ANSWERS]: (state, action: Action<IGetAnswer[]>) => ({ ...state, answersList: action.payload }),
  [QuestionAnswerActions.Type.LOAD_QUESTION_INFO]: (state, action: Action<boolean>) => ({ ...state, loading: action.payload })
}, initialState)