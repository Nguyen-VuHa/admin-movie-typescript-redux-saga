import counterReducer from 'features/counter/counterSlice';
import toastifySlice from 'reducers/toastifyReducer/toastifySlice';
import todoSlice from 'reducers/todoSlice';

export const rootReducer = {
    counter: counterReducer,
    todoState: todoSlice,
    toastifyState: toastifySlice,
}