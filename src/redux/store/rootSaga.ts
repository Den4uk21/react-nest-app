import { all } from 'redux-saga/effects'

import watchAuth from '../auth/sagas'
import watchMain from '../main/sagas'

export default function* rootSaga() {
    yield all([
        watchAuth(),
        watchMain()
    ])
}