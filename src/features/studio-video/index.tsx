import React, { useEffect } from 'react'
import globalStyles from 'utils/globalStyle.module.scss';
import classNames from 'classnames/bind';
import Header from './Header';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { MovieContextProvider } from 'contexts/MovieContext';
import VideoList from './VideoList';

const gb = classNames.bind(globalStyles);

function StudioVideoMainPage() {
    // const dispatch = useAppDispatch();
    // const { currentPage, search, sortBy } = useAppSelector(state => state.movieState);

    // useEffect(() => {
    //     dispatch({
    //         type: 'FETCH_LIST_MOVIE',
    //         payload: {
    //             page: currentPage,
    //             search,
    //             sortBy
    //         },
    //     });
    // }, [search, sortBy]);
    

    return (
        <MovieContextProvider>
            <div className={gb('container-main')}>
                <Header />
                <VideoList />
                <div style={{paddingBottom: '20px'}} />
            </div>
        </MovieContextProvider>
        
    )
}

export default StudioVideoMainPage