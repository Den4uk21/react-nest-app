import { handleActions } from 'redux-actions'
import { MainActions } from './actions'
import { IMainState, ILinkQuestion } from '../../types/main/types'

const initialState: IMainState = {
  questionsList: []
}

export const MainReducer = handleActions<IMainState, ILinkQuestion[]>({
  [MainActions.Type.PUSH_ALL_QUESTIONS]: (state, action) => ({...state, questionsList: action.payload}),
}, initialState)