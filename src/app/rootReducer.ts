import counterReducer from 'features/counter/counterSlice';
import toastifySlice from 'reducers/toastifyReducer/toastifySlice';
import todoSlice from 'reducers/todoSlice';
import dashboardSlice from 'reducers/dashboardReducer/dashboardSlice';

export const rootReducer = {
    counter: counterReducer,
    todoState: todoSlice,
    toastifyState: toastifySlice,
    dashboardState: dashboardSlice,
}