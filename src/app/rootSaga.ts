import { all } from 'redux-saga/effects';
import { categorySaga } from 'reducers/categoryReducer/categorySaga';

export default function* rootSaga() {
    yield all([
        categorySaga(),
        
    ]);
}
