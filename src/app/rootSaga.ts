import { all } from 'redux-saga/effects';
import { todoSaga } from 'reducers/todoSaga';

export default function* rootSaga() {
    yield all([todoSaga()]);
}
