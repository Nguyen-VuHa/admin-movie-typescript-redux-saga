import toastifySlice from 'reducers/toastifyReducer/toastifySlice';
import dashboardSlice from 'reducers/dashboardReducer/dashboardSlice';
import categorySlice from 'reducers/categoryReducer/categorySlice';
import folderSlice from 'reducers/folderReducer/folderSlice';

export const rootReducer = {
    toastifyState: toastifySlice,
    dashboardState: dashboardSlice,
    categoryState: categorySlice,
    folderState: folderSlice,
}