import { all } from 'redux-saga/effects';
import { categorySaga } from 'reducers/categoryReducer/categorySaga';
import { folderSaga } from 'reducers/folderReducer/folderSaga';
import { authorActorSaga } from 'reducers/authorActorReducer/authroActorSaga';

export default function* rootSaga() {
    yield all([
        categorySaga(),
        folderSaga(),
        authorActorSaga(),
    ]);
}
