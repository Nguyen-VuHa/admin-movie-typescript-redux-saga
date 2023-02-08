import moviesApi from "api/movieApi";
import { call, put, takeLatest, takeLeading } from "redux-saga/effects";
import { createNewMovieFailed, createNewMovieSuccess, fetchDetailMovieFailed, fetchDetailMovieSuccess, fetchMovieFailed, fetchMovieSuccess, setLoadingDetail, setLoadingFetch, updateMovieFailed, updateMovieSuccess, updateStatusMovie } from "./movieSlice";

function* fetchAllMovie(action: any): any {
    try {
        yield put(setLoadingFetch());
        const response = yield call(moviesApi.fetchAllMovie, action.payload)
        yield put(fetchMovieSuccess(response))
    }
    catch(err: any) {
        yield put(fetchMovieFailed(err.response.data))
    }
}

function* changeStatusMovie(action: any): any {
    try {
        yield call(moviesApi.updateStatusMovie, action.payload)
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
        yield call(moviesApi.createNewMovie, action.payload)
        yield put(createNewMovieSuccess())
    }
    catch(err: any) {
        yield put(createNewMovieFailed(err.message))
    }
}

function* updateNewMovie(action: any): any {
    try {
        yield call(moviesApi.updateMovie, action.payload)
        yield put(updateMovieSuccess())
    }
    catch(err: any) {
        yield put(updateMovieFailed(err.message))
    }
}

function* getMovieDetailById(action: any): any {
    try {
        yield put(setLoadingDetail())
        const response = yield call(moviesApi.getMovieDetailById, action.payload)
        yield put(fetchDetailMovieSuccess(response.data))
    }
    catch(err: any) {
        yield put(fetchDetailMovieFailed(err.message))
    }
}


export function* movieSaga() {
    yield takeLatest('FETCH_LIST_MOVIE', fetchAllMovie);
    yield takeLeading('CHANGE_STATUS_MOVIE', changeStatusMovie);
    yield takeLeading('CREATE_NEW_MOVIE', createNewMovie);
    yield takeLeading('UPDATED_MOVIE', updateNewMovie);
    yield takeLeading('GET_MOVIE_BY_ID', getMovieDetailById);
}