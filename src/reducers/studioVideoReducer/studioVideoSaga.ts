import { call, put, takeLatest } from "redux-saga/effects";

// function* fetchFolderById(action: any): any {
//     try {
//         yield put(setLoadingFetchFolder());
//         let res = yield call(folderApi.getFolder, action.payload);
//         yield put(fetchFolderSuccess(res.data));
//     }
//     catch(err: any) {
//         yield put(fetchFolderFailed(err.response.data));
//     }
// }


export function* studioVideoSaga() {
    // yield takeLatest('FETCH_FOLDER_BY_ID', fetchFolderById);
}