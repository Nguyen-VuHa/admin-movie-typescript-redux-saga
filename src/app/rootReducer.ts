import toastifySlice from 'reducers/toastifyReducer/toastifySlice';
import dashboardSlice from 'reducers/dashboardReducer/dashboardSlice';
import categorySlice from 'reducers/categoryReducer/categorySlice';
import folderSlice from 'reducers/folderReducer/folderSlice';
import authorActorSlice from 'reducers/authorActorReducer/authorActorSlice';

export const rootReducer = {
    toastifyState: toastifySlice,
    dashboardState: dashboardSlice,
    categoryState: categorySlice,
    folderState: folderSlice,
    authorActorState: authorActorSlice,
}