import { all } from 'redux-saga/effects'

import watchAuth from '../auth/sagas'
import watchMain from '../main/sagas'
import watchQuestionAnswer from '../question-answer/sagas'

export default function* rootSaga() {
    yield all([
        watchAuth(),
        watchMain(),
        watchQuestionAnswer()
    ])
}