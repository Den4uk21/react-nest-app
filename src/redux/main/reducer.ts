import { handleActions, Action } from 'redux-actions'
import { MainActions } from './actions'
import { IMainState, ILinkQuestionResponse } from '../../types/main/types'

const initialState: IMainState = {
  questions: {
    questionsList: [],
    amount: 0
  },
  loading: true
}

export const MainReducer = handleActions<IMainState, any>({
  [MainActions.Type.PUSH_ALL_QUESTIONS]: (state, action: Action<ILinkQuestionResponse>) => ({ ...state, questions: action.payload }),
  [MainActions.Type.LOAD_ALL_QUESTIONS]: (state, action: Action<boolean>) => ({ ...state, loading: action.payload })
}, initialState)