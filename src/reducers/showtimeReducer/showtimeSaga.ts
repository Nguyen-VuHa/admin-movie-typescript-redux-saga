import showtimeApi from "api/showtimeApi";
import { call, put, takeLatest, takeLeading } from "redux-saga/effects";
import { createShowtimeFailed, createShowtimeSuccess, fetchShowtimeFailed, fetchShowtimeSuccess, setLoadingEdit, setLoadingFetch } from "./showtimeSlice";

function* fetchAllShowtime(action: any): any {
    try {
        yield put(setLoadingFetch());
        const response = yield call(showtimeApi.fetchShowtimes, action.payload);
        yield put(fetchShowtimeSuccess(response))
    }
    catch(err: any) {
        yield put(fetchShowtimeFailed(err.response.message))
    }
}

function* createShowtime(action: any): any {
    try {
        yield put(setLoadingEdit());
        yield call(showtimeApi.createShowtime, action.payload);
        yield put(createShowtimeSuccess());
    }
    catch(err: any) {
        yield put(createShowtimeFailed(err.response.message));
    }
}


export function* showtimeSaga() {
    yield takeLatest('FETCH_LIST_SHOWTIME', fetchAllShowtime);

    yield takeLeading('CREATE_SHOWTIME', createShowtime);
}