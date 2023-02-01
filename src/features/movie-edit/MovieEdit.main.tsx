import React, { useEffect } from 'react'
import globalStyles from 'utils/globalStyle.module.scss';
import classNames from 'classnames/bind';
import Header from './Header/Header.main';
import FormDataMain from './FormData/FormData.main';
import { MovieContextProvider } from 'contexts/MovieContext';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { resetFormEditMovie, setDefaultStatusEditMovie } from 'reducers/movieReducer/movieSlice';
import { setLoadingFullScreen } from 'reducers/globalReducer/globalSlice';
import useToastify from 'hooks/useToastify';
import { useNavigate } from 'react-router-dom';

const gb = classNames.bind(globalStyles);

function MovieEditPage() {
    const dispatch = useAppDispatch();
    const { authorACtorSelect } = useAppSelector(state => state.authorActorState);
    const { categorySelect } = useAppSelector(state => state.categoryState);
    const { statusCreated } = useAppSelector(state => state.movieState);
    const dispatchToast = useToastify();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(authorACtorSelect.length <= 0)
            dispatch({ type: 'FETCH_DATA_SELECT_AUTHOR_ACTOR' });
    }, [authorACtorSelect]);

    useEffect(() => {
        if(categorySelect.length <= 0)
            dispatch({ type: 'FETCH_DATA_SELECT_CATEGORIES' });
    }, [categorySelect]);

    useEffect(() => {
        if(statusCreated === 1) {
            dispatchToast({
                type: 'TYPE_SUCCESS',
                payload: {
                    position: 'top-left',
                    message: 'Tạo mới thành công!',
                }
            });

            navigate(-1);
            dispatch(resetFormEditMovie());
            dispatch(setLoadingFullScreen(false));
            dispatch(setDefaultStatusEditMovie());
        }

        if(statusCreated === 2) {
            dispatchToast({
                type: 'TYPE_ERROR',
                payload: {
                    position: 'top-left',
                    message: 'Tạo mới thất bại!',
                }
            });
            
            dispatch(setLoadingFullScreen(false));
            dispatch(setDefaultStatusEditMovie());
        }

    }, [statusCreated])
    

    return (
        <MovieContextProvider>
            <div className={gb('container-main')}>
                <Header />
                <FormDataMain />
            </div>
        </MovieContextProvider>
    )
}

export default MovieEditPage