import cinemaApi from "api/cinemaApi";
import { call, put, takeLatest } from "redux-saga/effects";
import { fetchAllSiteFailed, fetchAllSiteSuccess, fetchCinemaBySiteFailed, fetchCinemaBySiteSuccess, setLoadingFetch } from "./cinemaSlice";

function* fetchAllSite(): any {
    try {
        const response = yield call(cinemaApi.fetchAllSite);
        yield put(fetchAllSiteSuccess(response.data));
    }
    catch(err: any) {
        yield put(fetchAllSiteFailed(err.response.data));
    }
}

function* fetchCinemaBySite(action: any): any {
    try {
        yield put(setLoadingFetch(true));
        const response = yield call(cinemaApi.fetchCinemaBySite, action.payload);
        yield put(fetchCinemaBySiteSuccess({
            id: action.payload.id,
            data: response.data,
            totalPage: response.totalPage,
            totalRows: response.totalRows,
        }));
    }
    catch(err: any) {
        yield put(fetchCinemaBySiteFailed(err.response.data));
    }
}

export function* cinemaSaga() {
    yield takeLatest('FETCH_ALL_SITES', fetchAllSite);
    yield takeLatest('FETCH_CINEMA_BY_SITE_ID', fetchCinemaBySite);
}