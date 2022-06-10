import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from 'models';
import { addListTodo, addTodo, removeTodo, updateTodo } from 'reducers/todoSlice';
import { put, takeEvery } from "redux-saga/effects";

export const addTodoSlice = createAction('todo/addTodoSlice');

function* addTodoSaga(action: PayloadAction<Todo>) {
    yield put(addTodo(action.payload));
}

function* removeTodoSaga(action: PayloadAction<string>) {
    yield put(removeTodo(action.payload));
}

function* updateTodoSaga(action: PayloadAction<string>) {
    yield put(updateTodo(action.payload));
}

function* addListTodoSaga(action: PayloadAction<Array<Todo>>) {
    yield put(addListTodo(action.payload));
}

export function* todoSaga() {
    yield takeEvery('ADD_TODO', addTodoSaga);
    yield takeEvery('REMOVE_TODO', removeTodoSaga);
    yield takeEvery('UPDATE_TODO', updateTodoSaga);
    yield takeEvery('ADD_LIST_TODO', addListTodoSaga);
}