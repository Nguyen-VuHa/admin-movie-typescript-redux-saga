import moment from "moment";
import { call, put, takeEvery } from "redux-saga/effects";
import { addNewAuthorActor, createdNewAuthorActorFailed, createNewAuthorActorSuccess, deleteAuthorActorFailed, deleteAuthorActorSuccess, fetchAuthorActorFailed, fetchAuthorActorSuccess, setLoadingCreated, setLoadingFetch, updatedAuthorActorFailed, updatedAuthorActorSuccess, updateItemAuthorActor } from "./authorActorSlice";
import authorActorApi from "api/authorActorApi";

const STATUS_DEFAULT = 1;
const arrType = [
    {
        value: 1,
        name: "Đạo diễn",
    },
    {
        value: 2,
        name: "Diễn viên",
    }
]

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

function* createNewAuthorActor(action: any): any {
    try {
        yield put(setLoadingCreated());
        const response = yield call(authorActorApi.createdNewAuthorActorApi, action.payload);
        yield put(addNewAuthorActor({
            id: response.id,
            name: action.payload.name,
            type: arrType.filter(arrT => arrT.value === action.payload.type)[0]?.name,
            createdBy: action.payload.createdBy,
            status: STATUS_DEFAULT,
            updatedAt: moment().format('YYYY-MM-DD hh:mm:ss'),
            createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
        }))
        yield put(createNewAuthorActorSuccess())
    }
    catch(err: any) {
        yield put(createdNewAuthorActorFailed(err.response.data))
    }
}

function* updatedAuthorActor(action: any): any {
    try {
        yield put(setLoadingCreated());
        yield call(authorActorApi.updatedAuthorActorApi, action.payload);
        yield put(updateItemAuthorActor({
            id: action.payload.id,
            name: action.payload.name,
            type: arrType.filter(arrT => arrT.value === action.payload.type)[0]?.name || "Không xác định",
        }))
        yield put(updatedAuthorActorSuccess())
    }
    catch(err: any) {
        yield put(updatedAuthorActorFailed(err.response.data))
    }
}


function* deletedAuthorActor(action: any): any {
    try {
        yield call(authorActorApi.deletedAuthorActorApi, action.payload);
        yield put(deleteAuthorActorSuccess(action.payload))
    }
    catch(err: any) {
        yield put(deleteAuthorActorFailed(err.response.data))
    }
}


export function* authorActorSaga() {
    yield takeEvery('FETCH_LIST_AUTHOR_ACTOR', fetchListAuthorActor);
    yield takeEvery('CREATED_NEW_AUTHOR_ACTOR', createNewAuthorActor);
    yield takeEvery('UPDATED_AUTHOR_ACTOR', updatedAuthorActor);
    yield takeEvery('DELETED_AUTHOR_ACTOR', deletedAuthorActor);
}