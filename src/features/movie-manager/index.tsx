import React, { useEffect } from 'react'
import globalStyles from 'utils/globalStyle.module.scss';
import classNames from 'classnames/bind';
import Header from './Header';
import TableMovie from './TableMovie';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { MovieContextProvider } from 'contexts/MovieContext';

const gb = classNames.bind(globalStyles);

function MovieManagerPage() {
    const dispatch = useAppDispatch();
    const { currentPage, search, sortBy } = useAppSelector(state => state.movieState);

    useEffect(() => {
        dispatch({
            type: 'FETCH_LIST_MOVIE',
            payload: {
                page: currentPage,
                search,
                sortBy
            },
        });
    }, [search, sortBy]);
    

    return (
        <MovieContextProvider>
            <div className={gb('container-main')}>
                <Header />
                <TableMovie />
                <div style={{paddingBottom: '20px'}} />
            </div>
        </MovieContextProvider>
        
    )
}

export default MovieManagerPage