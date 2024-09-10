import { call, put, takeLatest } from "redux-saga/effects";
import { fetchVideoListFailed, fetchVideoListSuccess, setStatusIsFetchVideoList } from "./studioVideoSlice";
import { apiGetVideoList } from "api/mediaApi";



function* fetchVideoList(action: any): any {
    try {
        yield put(setStatusIsFetchVideoList(true));
        const response = yield call(apiGetVideoList, action.payload)
       
        if (response.code === 200) {
            yield put(fetchVideoListSuccess(response))
        } else {
            yield put(fetchVideoListFailed(response))
        }

        yield put(setStatusIsFetchVideoList(false));
    }
    catch(err: any) {
        yield put(fetchVideoListFailed(err.response.data))
        yield put(setStatusIsFetchVideoList(false));
    }
}


export function* studioVideoSaga() {
    yield takeLatest('FETCH_VIDEO_LIST', fetchVideoList);
}