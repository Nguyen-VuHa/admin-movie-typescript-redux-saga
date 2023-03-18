import moviesApi from "api/movieApi";
import { call, put, takeLatest, takeLeading } from "redux-saga/effects";

function* fetchAllMovie(action: any): any {
    // try {
    //     yield put(setLoadingFetch());
    //     const response = yield call(moviesApi.fetchAllMovie, action.payload)
    //     yield put(fetchMovieSuccess(response))
    // }
    // catch(err: any) {
    //     yield put(fetchMovieFailed(err.response.data))
    // }
}



export function* showtimeSaga() {
    // yield takeLatest('FETCH_LIST_MOVIE', fetchAllMovie);
}