import counterReducer from 'features/counter/counterSlice';
import todoReducer from 'reducers/todoSlice';

export const rootReducer = {
    counter: counterReducer,
    todoState: todoReducer,
}