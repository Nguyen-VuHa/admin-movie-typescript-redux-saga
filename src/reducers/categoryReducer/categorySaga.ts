import categoriesApi from "api/categoyApi";
import moment from "moment";
import { call, put, takeEvery } from "redux-saga/effects";
import { addItemCategory, createdCategoryFailed, createdCategorySuccess, fetchCategoryFailed, fetchCategorySuccess, setLoadingCreated, setLoadingFetch, updatedCategoryFailed, updatedCategorySuccess, updateItemCategory } from "./categorySlice";
const STATUS_DEFAULT = 1;

function* fetchAllCategory(action: any): any {
    try {
        yield put(setLoadingFetch());
        const response = yield call(categoriesApi.fetchAllCategoryApi, action.payload);
        yield put(fetchCategorySuccess(response))
    }
    catch(err: any) {
        yield put(fetchCategoryFailed(err.response.data));
    }
}

function* createCategory(action: any): any {
    try {
        yield put(setLoadingCreated());
        let res = yield call(categoriesApi.createCategoryApi, action.payload);
        yield put(addItemCategory({
            id: res.id,
            category_name: action.payload.categoryName,
            createdBy: action.payload.createdBy,
            status: STATUS_DEFAULT,
            updatedAt: moment().format('YYYY-MM-DD'),
            createdAt: moment().format('YYYY-MM-DD'),
        }))
        yield put(createdCategorySuccess())
    }
    catch(err: any) {
        yield put(createdCategoryFailed(err.response.data));
    }
}

function* updateCategory(action: any): any {
    try {
        yield put(setLoadingCreated());
        yield call(categoriesApi.updateCategoryApi, action.payload);
        yield put(updateItemCategory({
            id: action.payload.id,
            category_name: action.payload.categoryName,
        }))
        yield put(updatedCategorySuccess())
    }
    catch(err: any) {
        yield put(updatedCategoryFailed(err.response.data));
    }
}


export function* categorySaga() {
    yield takeEvery('FETCH_ALL_CATEGORIES', fetchAllCategory);
    yield takeEvery('CREATE_CATEGORY', createCategory);
    yield takeEvery('UPDATE_CATEGORY', updateCategory);
}