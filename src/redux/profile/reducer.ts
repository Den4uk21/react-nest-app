import { handleActions, Action } from 'redux-actions'
import { ProfileActions } from './actions'
import { IProfileState, IProfile } from '../../types/profile/types'
import { ILinkQuestionResponse } from '../../types/main/types'

const initialState: IProfileState = {
  profileInfo: null,
  questionsNoAnswers: null,
  questionsWithAnswers: null
}

export const ProfileReducer = handleActions<IProfileState, any>({
  [ProfileActions.Type.PUSH_PROFILE]: (state, action: Action<IProfile>) => ({ ...state, profileInfo: action.payload }),
  [ProfileActions.Type.PUSH_USER_QUESTIONS_NO_ANSWERS]: (state, action: Action<ILinkQuestionResponse>) => ({ 
    ...state, 
    questionsNoAnswers: action.payload 
  }),
  [ProfileActions.Type.PUSH_USER_QUESTIONS_WITH_ANSWERS]: (state, action: Action<ILinkQuestionResponse>) => ({ 
    ...state, 
    questionsWithAnswers: action.payload 
  })
}, initialState)