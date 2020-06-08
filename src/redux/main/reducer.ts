import { handleActions, Action } from 'redux-actions'
import { MainActions } from './actions'
import { IMainState, ILinkQuestionResponse, IFilterQuestions } from '../../types/main/types'

const initialState: IMainState = {
  questions: {
    questionsList: [],
    amount: 0
  },
  filter: {
    type: 'new',
    categories: [],
    page: 1
  }
}

export const MainReducer = handleActions<IMainState, any>({
  [MainActions.Type.GET_ALL_QUESTIONS]: (state, action: Action<IFilterQuestions>) => ({ ...state, filter: { ...state.filter, ...action.payload } }),
  [MainActions.Type.PUSH_ALL_QUESTIONS]: (state, action: Action<ILinkQuestionResponse>) => ({ ...state, questions: action.payload })
}, initialState)