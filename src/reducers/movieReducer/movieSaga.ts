import moviesApi from "api/movieApi";
import moment from "moment";
import { call, put, takeLatest, takeLeading } from "redux-saga/effects";
import { createNewMovieFailed, createNewMovieSuccess, fetchMovieFailed, fetchMovieSuccess, setLoadingCreated, setLoadingFetch, updateStatusMovie } from "./movieSlice";

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


function* createNewMovie(action: any): any {
    try {
        yield call(moviesApi.createNewMovie, action.payload);
        yield put(createNewMovieSuccess())
    }
    catch(err: any) {
        yield put(createNewMovieFailed(err.message))
    }
}

export function* movieSaga() {
    yield takeLatest('FETCH_LIST_MOVIE', fetchAllMovie);
    yield takeLeading('CHANGE_STATUS_MOVIE', changeStatusMovie);
    yield takeLeading('CREATE_NEW_MOVIE', createNewMovie);
}