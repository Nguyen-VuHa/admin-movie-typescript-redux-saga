import showtimeApi from "api/showtimeApi";
import { call, put, takeLatest, takeLeading } from "redux-saga/effects";
import { fetchShowtimeFailed, fetchShowtimeSuccess, setLoadingFetch } from "./showtimeSlice";

function* fetchAllShowtime(action: any): any {
    try {
        yield put(setLoadingFetch());
        const response = yield call(showtimeApi.fetchShowtimes, action.payload);
        yield put(fetchShowtimeSuccess(response))
    }
    catch(err: any) {
        yield put(fetchShowtimeFailed(err.response.data))
    }
}



export function* showtimeSaga() {
    yield takeLatest('FETCH_LIST_SHOWTIME', fetchAllShowtime);
}