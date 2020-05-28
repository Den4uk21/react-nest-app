/* eslint-disable @typescript-eslint/no-namespace */
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { MainReducer } from '../main/reducer'

import { IMainState } from '../../types/main/types'

export interface IRootReducer {
  router: any,
  main: IMainState
}

const rootReducer = combineReducers<IRootReducer>({
  router: routerReducer,
  main: MainReducer
})

export default rootReducer