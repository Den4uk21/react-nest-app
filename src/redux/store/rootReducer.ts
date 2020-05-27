/* eslint-disable @typescript-eslint/no-namespace */
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

export interface IRootReducer {
  router: any,
}

const rootReducer = combineReducers<IRootReducer>({
  router: routerReducer
})

export default rootReducer