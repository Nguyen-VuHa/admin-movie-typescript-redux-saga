import moviesApi from "api/movieApi";
import moment from "moment";
import { call, put, takeEvery, takeLatest, takeLeading } from "redux-saga/effects";
import { fetchMovieFailed, fetchMovieSuccess, setLoadingFetch, updateStatusMovie } from "./movieSlice";

const STATUS_DEFAULT = 1;

function* fetchAllMovie(action: any): any {
    try {
        yield put(setLoadingFetch());
        const response = yield call(moviesApi.fetchAllMovie, action.payload);
        yield put(fetchMovieSuccess(response))
    }
    catch(err: any) {
        yield put(fetchMovieFailed(err.response.data));
    }
}

function* changeStatusMovie(action: any): any {
    try {
        yield call(moviesApi.updateStatusMovie, action.payload);
        yield put(updateStatusMovie({
            id: action.payload,
            status: true,
        }))
    }
    catch(err: any) {
        yield put(updateStatusMovie({
            id: action.payload,
            status: false,
        }))
    }
}

export function* movieSaga() {
    yield takeLatest('FETCH_LIST_MOVIE', fetchAllMovie);
    yield takeLeading('CHANGE_STATUS_MOVIE', changeStatusMovie);
}