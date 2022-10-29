import { all } from 'redux-saga/effects';
import { categorySaga } from 'reducers/categoryReducer/categorySaga';
import { folderSaga } from 'reducers/folderReducer/folderSaga';

export default function* rootSaga() {
    yield all([
        categorySaga(),
        folderSaga(),
    ]);
}
