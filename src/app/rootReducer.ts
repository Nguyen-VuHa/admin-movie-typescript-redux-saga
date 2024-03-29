import toastifySlice from 'reducers/toastifyReducer/toastifySlice';
import dashboardSlice from 'reducers/dashboardReducer/dashboardSlice';
import categorySlice from 'reducers/categoryReducer/categorySlice';
import folderSlice from 'reducers/folderReducer/folderSlice';
import authorActorSlice from 'reducers/authorActorReducer/authorActorSlice';
import movieSlice from 'reducers/movieReducer/movieSlice';
import globalSlice from 'reducers/globalReducer/globalSlice';
import cinemaSlice from 'reducers/cinemaReducer/cinemaSlice';
import showtimeSlice from 'reducers/showtimeReducer/showtimeSlice';

export const rootReducer = {
    toastifyState: toastifySlice,
    dashboardState: dashboardSlice,
    categoryState: categorySlice,
    folderState: folderSlice,
    authorActorState: authorActorSlice,
    movieState: movieSlice,
    globalState: globalSlice,
    cinemaState: cinemaSlice,
    showtimeState: showtimeSlice,
}