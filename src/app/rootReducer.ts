import toastifySlice from 'reducers/toastifyReducer/toastifySlice';
import dashboardSlice from 'reducers/dashboardReducer/dashboardSlice';
import categorySlice from 'reducers/categoryReducer/categorySlice';
import folderSlice from 'reducers/folderReducer/folderSlice';
import authorActorSlice from 'reducers/authorActorReducer/authorActorSlice';
import movieSlice from 'reducers/movieReducer/movieSlice';

export const rootReducer = {
    toastifyState: toastifySlice,
    dashboardState: dashboardSlice,
    categoryState: categorySlice,
    folderState: folderSlice,
    authorActorState: authorActorSlice,
    movieState: movieSlice,
}