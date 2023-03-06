import React, { useEffect } from 'react'
import globalStyles from 'utils/globalStyle.module.scss';
import classNames from 'classnames/bind';
import Header from './Header/Header.main';
import FormDataMain from './FormData/FormData.main';
import { MovieContextProvider } from 'contexts/MovieContext';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { resetFormEditMovie, resetStatusDetail, setDefaultStatusEditMovie } from 'reducers/movieReducer/movieSlice';
import { setLoadingFullScreen } from 'reducers/globalReducer/globalSlice';
import useToastify from 'hooks/useToastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { STATUS_FAILED, STATUS_SUCCESS } from 'constants/status';

const gb = classNames.bind(globalStyles);

function MovieEditPage() {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const idMovie = searchParams.get('id'); 

    const { authorACtorSelect } = useAppSelector(state => state.authorActorState);
    const { categorySelect } = useAppSelector(state => state.categoryState);
    const { statusEdit, loadingDetail, statusDetail } = useAppSelector(state => state.movieState);
    const dispatchToast = useToastify();
    const navigate = useNavigate();
    
    useEffect(() => {
        /*
            re-render according to `authorActorSelect`
            - check data `authorACtorSelect` doesn't exists => fetch data select
        */
        if(authorACtorSelect.length <= 0)
            dispatch({ type: 'FETCH_DATA_SELECT_AUTHOR_ACTOR' });
    }, [authorACtorSelect]);

    useEffect(() => {
        /*
            re-render according to `categorySelect`
            - check data `categorySelect` doesn't exists => fetch data select
        */
        if(categorySelect.length <= 0)
            dispatch({ type: 'FETCH_DATA_SELECT_CATEGORIES' });
    }, [categorySelect]);

    useEffect(() => {
        /*
            re-render according to `statusEdit`
            - statusEdit === STATUS_SUCCESS: created or updated success, show toast success, clear form data, navigate go back
            - statusEdit === STATUS_FAILED: created or updated failed, show toast error
        */
        if(statusEdit === STATUS_SUCCESS) {
            dispatchToast({
                type: 'TYPE_SUCCESS',
                payload: {
                    position: 'top-left',
                    message: `${idMovie ? 'Cập nhật' : 'Tạo mới'} thành công!`,
                }
            });

            navigate(-1);
            dispatch(resetFormEditMovie());
            dispatch(setLoadingFullScreen(false));
            dispatch(setDefaultStatusEditMovie());
        }

        if(statusEdit === STATUS_FAILED) {
            dispatchToast({
                type: 'TYPE_ERROR',
                payload: {
                    position: 'top-left',
                    message: `${idMovie ? 'Cập nhật' : 'Tạo mới'} thất bại!`,
                }
            });
            
            dispatch(setLoadingFullScreen(false));
            dispatch(setDefaultStatusEditMovie());
        }

    }, [statusEdit])
    
    useEffect(() => {
        /*
            re-render according to params `idMovie`
            - `idMovie` is valid: fetch data detail by `idMovie`
        */
        if(idMovie) {
            dispatch({
                type: 'GET_MOVIE_BY_ID',
                payload: idMovie,
            })
        }

        return () => { 
            // terminate lifecycle to component => reset form data if data update exists
            if(idMovie) {
                dispatch(resetFormEditMovie());
                dispatch(setLoadingFullScreen(false));
            }
        }
    }, [idMovie, dispatch]);


    useEffect(() => {
        /*
            re-render according to params `loadingDetail`
            - if `loadingDetail` and exists params `idMovie` => show loading fullscreen for data update fetch
        */
        if(idMovie)
            dispatch(setLoadingFullScreen(loadingDetail));
        
    }, [loadingDetail, dispatch]);

    useEffect(() => {
        /*
            re-render according to params `statusDetail`
            - if `statusDetail` === STATUS_FAILED: process data update fetch failed 
            => navigate goback, reset status detail on store
        */
        if(statusDetail === STATUS_FAILED) {
            navigate(-1);
            dispatch(resetStatusDetail());
        }
    }, [statusDetail])

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