import cinemaApi from "api/cinemaApi";
import { call, put, takeLatest, takeLeading } from "redux-saga/effects";
import { createdCinemaFailed, createdCinemaSuccess, fetchAllSiteFailed, fetchAllSiteSuccess, fetchCinemaBySiteFailed, fetchCinemaBySiteSuccess, fetchLocalAddressFailed, fetchLocalAddressSuccess, setLoadingEdit, setLoadingFetch } from "./cinemaSlice";

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

function* fetchLocalAddress(): any {
    try {
        const response = yield call(cinemaApi.fetchLocalAddress);
        yield put(fetchLocalAddressSuccess(response.data));
    }
    catch(err: any) {
        yield put(fetchLocalAddressFailed(err.response.data));
    }
}

function* createCinema(action: any): any {
    try {
        yield put(setLoadingEdit(true)); // set loadingEdit is true on store

        const response = yield call(cinemaApi.createCinema, action.payload); //handle asynchorouse request data to server
        yield put(createdCinemaSuccess(response.data)); // set status success on store
    }
    catch(err: any) {
        yield put(createdCinemaFailed(err.response.data)); // set status failed on store
    }
}

export function* cinemaSaga() {
    yield takeLeading('FETCH_ALL_SITES', fetchAllSite);
    yield takeLeading('FETCH_CINEMA_BY_SITE_ID', fetchCinemaBySite);
    yield takeLeading('FETCH_LOCAL_ADDRESS', fetchLocalAddress);

    yield takeLatest('CREATED_CINEMA', createCinema);
}