import { createAction } from "@reduxjs/toolkit";
import { fetchDataOverViewDashBoard, setLoadingOverView } from 'reducers/dashboardReducer/dashboardSlice';
import { call, put, takeEvery } from "redux-saga/effects";

export const addTodoSlice = createAction('todo/addTodoSlice');

function* fetchDataOverView() {
    yield put(setLoadingOverView());
    // yield put(fetchDataOverViewDashBoard);
}

export function* dashboardSaga() {
    yield takeEvery('FETCH_OVER_VIEW_DASHBOARD', fetchDataOverView);
}