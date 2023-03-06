import cinemaApi from "api/cinemaApi";
import { call, put, takeLatest, takeLeading } from "redux-saga/effects";
import { editCinemaFailed, editCinemaSuccess, editRoomFailed, editRoomSuccess, fetchAllSiteFailed, fetchAllSiteSuccess, fetchCinemaByIdFailed, fetchCinemaByIdSuccess, fetchCinemaBySiteFailed, fetchCinemaBySiteSuccess, fetchCinemaSelectBySiteFailed, fetchCinemaSelectBySiteSuccess, fetchDetailRoomByIdFailed, fetchDetailRoomByIdSuccess, fetchLocalAddressFailed, fetchLocalAddressSuccess, fetchRoomByCinemaIdFailed, fetchRoomByCinemaIdSuccess, setLoadingEdit, setLoadingFetch, setLoadingFetchDetail } from "./cinemaSlice";

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

function* fetchCinemaSelectBySite(action: any): any {
    try {
        const response = yield call(cinemaApi.fetchCinemaSelectBySite, action.payload);
        yield put(fetchCinemaSelectBySiteSuccess(response.data));
    }
    catch(err: any) {
        yield put(fetchCinemaSelectBySiteFailed(err.response.data));
    }
}

function* fetchDetailCinemaById(action: any): any {
    try {
        yield put(setLoadingFetchDetail(true));
        const response = yield call(cinemaApi.fetchDetailCinemaById, action.payload);
        yield put(fetchCinemaByIdSuccess(response.data));
    }
    catch(err: any) {
        yield put(fetchCinemaByIdFailed(err.response.data));
    }
}


function* fetchRoomByCinemaId(action: any): any {
    try {
        yield put(setLoadingFetch(true));
        const response = yield call(cinemaApi.fetchRoomByCinemaId, action.payload);
        yield put(fetchRoomByCinemaIdSuccess({
            siteId: action.payload.siteId,
            id: action.payload.id,
            data: response.data,
            totalPage: response.totalPage,
            totalRows: response.totalRows,
        }));
    }
    catch(err: any) {
        yield put(fetchRoomByCinemaIdFailed(err.response.data));
    }
}

function* fetchDetailRoomById(action: any): any {
    try {
        yield put(setLoadingFetchDetail(true));
        const response = yield call(cinemaApi.fetchDetailRoomById, action.payload);
        yield put(fetchDetailRoomByIdSuccess(response.data));
    }
    catch(err: any) {
        yield put(fetchDetailRoomByIdFailed(err.response.data));
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

        yield call(cinemaApi.createCinema, action.payload); //handle asynchorouse request data to server
        yield put(editCinemaSuccess()); // set status success on store
    }
    catch(err: any) {
        yield put(editCinemaFailed(err.response.data)); // set status failed on store
    }
}

function* updateCinema(action: any): any {
    try {
        yield put(setLoadingEdit(true)); // set loadingEdit is true on store

        yield call(cinemaApi.updateCinema, action.payload); //handle asynchorouse request data to server
        yield put(editCinemaSuccess()); // set status success on store
    }
    catch(err: any) {
        yield put(editCinemaFailed(err.response.data)); // set status failed on store
    }
}

function* createRoom(action: any): any {
    try {
        yield put(setLoadingEdit(true)); // set loadingEdit is true on store

        yield call(cinemaApi.createRoom, action.payload); //handle asynchorouse request data to server
        yield put(editRoomSuccess()); // set status success on store
    }
    catch(err: any) {
        yield put(editRoomFailed(err.response.data)); // set status failed on store
    }
}

function* updateRoom(action: any): any {
    try {
        yield put(setLoadingEdit(true)); // set loadingEdit is true on store

        yield call(cinemaApi.updateRoom, action.payload); //handle asynchorouse request data to server
        yield put(editRoomSuccess()); // set status success on store
    }
    catch(err: any) {
        yield put(editRoomFailed(err.response.data)); // set status failed on store
    }
}

export function* cinemaSaga() {
    yield takeLeading('FETCH_ALL_SITES', fetchAllSite);
    yield takeLeading('FETCH_CINEMA_BY_SITE_ID', fetchCinemaBySite);
    yield takeLeading('FETCH_CINEMA_SELECT_BY_SITE_ID', fetchCinemaSelectBySite);
    yield takeLeading('FETCH_ROOM_BY_CINEMA_ID', fetchRoomByCinemaId);
    yield takeLeading('FETCH_CINEMA_BY_ID', fetchDetailCinemaById);
    yield takeLeading('FETCH_DETAIL_ROOM_BY_ID', fetchDetailRoomById);
    yield takeLeading('FETCH_LOCAL_ADDRESS', fetchLocalAddress);

    yield takeLatest('CREATED_CINEMA', createCinema);
    yield takeLatest('UPDATED_CINEMA', updateCinema);

    yield takeLatest('CREATED_ROOM', createRoom);
    yield takeLatest('UPDATED_ROOM', updateRoom);
}