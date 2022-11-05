import categoriesApi from "api/categoyApi";
import moment from "moment";
import { call, put, takeEvery } from "redux-saga/effects";
import { fetchAuthorActorFailed, fetchAuthorActorSuccess, setLoadingFetch } from "./authorActorSlice";
import authorActorApi from "api/authorActorApi";

const STATUS_DEFAULT = 1;

function* fetchListAuthorActor(action: any): any {
    try {
        yield put(setLoadingFetch());
        const response = yield call(authorActorApi.getListAuthorActorApi, action.payload);
        yield put(fetchAuthorActorSuccess(response))
    }
    catch(err: any) {
        yield put(fetchAuthorActorFailed(err.response.data))
    }
}


export function* authorActorSaga() {
    yield takeEvery('FETCH_LIST_AUTHOR_ACTOR', fetchListAuthorActor);
}