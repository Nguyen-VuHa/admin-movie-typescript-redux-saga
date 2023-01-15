import categoriesApi from "api/categoyApi";
import moment from "moment";
import { call, put, takeLatest, takeLeading } from "redux-saga/effects";
import { addItemCategory, createdCategoryFailed, createdCategorySuccess, deleteCategoryFailed, deleteCategorySuccess, fetchCategoryFailed, fetchCategorySuccess, fetchDataSelectCategoryFailed, fetchDataSelectCategorySuccess, setLoadingCreated, setLoadingFetch, updatedCategoryFailed, updatedCategorySuccess, updateItemCategory, updateStatusCategory } from "./categorySlice";

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

function* fetchDataSelectCategory(): any {
    try {
        const response = yield call(categoriesApi.fetchDataSelectCategoryApi);
        yield put(fetchDataSelectCategorySuccess(response.data))
    }
    catch(err: any) {
        yield put(fetchDataSelectCategoryFailed(err.response.data));
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
            updatedAt: moment().format('YYYY-MM-DD hh:mm:ss'),
            createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
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

function* updateStatusCategorySaga(action: any): any {
    try {
        yield call(categoriesApi.updateStatusCateApi, action.payload.id);
        yield put(updateStatusCategory({
            id: action.payload.id,
            status: action.payload.status === 1 ? 0 : 1,
        }))
    }
    catch(err: any) {
        yield put(updateStatusCategory({
            id: action.payload.id,
            status: action.payload.status,
        }))
    }
}

function* deleteCategorySaga(action: any): any {
    try {
        yield call(categoriesApi.deleteCategoryApi, action.payload);
        yield put(deleteCategorySuccess(action.payload));
    }
    catch(err: any) {
        yield put(deleteCategoryFailed({ message: err.message }))
    }
}


export function* categorySaga() {
    yield takeLatest('FETCH_ALL_CATEGORIES', fetchAllCategory);
    yield takeLatest('FETCH_DATA_SELECT_CATEGORIES', fetchDataSelectCategory);
    yield takeLeading('CREATE_CATEGORY', createCategory);
    yield takeLeading('UPDATE_CATEGORY', updateCategory);
    yield takeLeading('UPDATE_STATUS_CATEGORY', updateStatusCategorySaga);
    yield takeLeading('DELETE_CATEGORY', deleteCategorySaga);
}