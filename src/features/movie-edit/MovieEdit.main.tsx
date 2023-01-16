import React, { useEffect } from 'react'
import globalStyles from 'utils/globalStyle.module.scss';
import classNames from 'classnames/bind';
import Header from './Header/Header.main';
import FormDataMain from './FormData/FormData.main';
import { MovieContextProvider } from 'contexts/MovieContext';
import { useAppDispatch, useAppSelector } from 'app/hooks';

const gb = classNames.bind(globalStyles);

function MovieEditPage() {
    const dispatch = useAppDispatch();
    const { authorACtorSelect } = useAppSelector(state => state.authorActorState);
    const { categorySelect } = useAppSelector(state => state.categoryState);
    
    useEffect(() => {
        if(authorACtorSelect.length <= 0)
            dispatch({ type: 'FETCH_DATA_SELECT_AUTHOR_ACTOR' });
    }, [authorACtorSelect]);

    useEffect(() => {
        if(categorySelect.length <= 0)
            dispatch({ type: 'FETCH_DATA_SELECT_CATEGORIES' });
    }, [categorySelect]);

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