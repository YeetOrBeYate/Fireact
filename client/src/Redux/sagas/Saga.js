import { all } from 'redux-saga/effects'

import watchNotification from './Notification'

export default function* rootSaga() {
  yield all([
    watchNotification()
  ])
};
