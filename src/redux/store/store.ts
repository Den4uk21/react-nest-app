import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'

import rootReducer from './rootReducer'
import rootSaga from './rootSaga'

export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware)
)
const store = createStore(rootReducer, enhancer)

sagaMiddleware.run(rootSaga)

export default store