import { createAction } from "@reduxjs/toolkit";
import folderApi from "api/folderApi";
import { call, put, takeEvery, takeLatest, takeLeading } from "redux-saga/effects";
import { fetchFolderFailed, fetchFolderSuccess, setLoadingFetchFolder } from "./folderSlice";

function* fetchFolderById(action: any): any {
    try {
        yield put(setLoadingFetchFolder());
        let res = yield call(folderApi.getFolder, action.payload);
        yield put(fetchFolderSuccess(res.data));
    }
    catch(err: any) {
        yield put(fetchFolderFailed(err.response.data));
    }
}


export function* folderSaga() {
    yield takeLatest('FETCH_FOLDER_BY_ID', fetchFolderById);
}