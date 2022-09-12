import categoriesApi from "api/categoyApi";
import { call, put, takeEvery } from "redux-saga/effects";
import { createdCategoryFailed, createdCategorySuccess, fetchCategoryFailed, fetchCategorySuccess, setLoadingCreated, setLoadingFetch } from "./categorySlice";

function* fetchAllCategory(action: any): any {
    try {
        yield put(setLoadingFetch());
        const response = yield call(categoriesApi.fetchAllCategoryApi, action.payload);
        yield put(fetchCategorySuccess(response))
    }
    catch(err: any) {
        yield put(fetchCategoryFailed(err.message));
    }
}

function* createCategory(action: any): any {
    try {
        yield put(setLoadingCreated());
        yield call(categoriesApi.createCategoryApi, action.payload);
        yield put(createdCategorySuccess())
    }
    catch(err: any) {
        yield put(createdCategoryFailed(err.response.data));
    }
}


export function* categorySaga() {
    yield takeEvery('FETCH_ALL_CATEGORIES', fetchAllCategory);
    yield takeEvery('CREATE_CATEGORY', createCategory);
}