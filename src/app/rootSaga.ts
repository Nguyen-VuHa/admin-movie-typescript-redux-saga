import { all } from 'redux-saga/effects';
import { todoSaga } from 'reducers/todoSaga';
import { categorySaga } from 'reducers/categoryReducer/categorySaga';

export default function* rootSaga() {
    yield all([todoSaga(), categorySaga()]);
}
