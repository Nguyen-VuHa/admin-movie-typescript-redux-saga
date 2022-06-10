import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from 'app/store';
import { ListTodo, Todo } from 'models';

const initialState: ListTodo = {
    arrTodo: [],
};

export const todoSlice = createSlice({ 
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Todo>) => {
            state.arrTodo = state.arrTodo.concat(action.payload);
        },
        removeTodo: (state, action: PayloadAction<string>) => {
            state.arrTodo = state.arrTodo.filter(arr => arr.id !== action.payload);
        },
        updateTodo: (state, action: PayloadAction<string>) => {
            state.arrTodo = state.arrTodo.map(arr => arr.id === action.payload ? {...arr, status: 0} : {...arr});
        },
        addListTodo: (state, action: PayloadAction<Array<Todo>>) => {
            state.arrTodo = action.payload;
        },
    },
    extraReducers: () => {},
});

export const { addTodo, removeTodo, updateTodo, addListTodo } = todoSlice.actions;

export default todoSlice.reducer;
