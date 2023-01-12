import React, { useEffect } from 'react'
import globalStyles from 'utils/globalStyle.module.scss';
import classNames from 'classnames/bind';
import Header from './Header/Header.main';
import FormDataMain from './FormData/FormData.main';
import { MovieContextProvider } from 'contexts/MovieContext';
import { useAppDispatch } from 'app/hooks';

const gb = classNames.bind(globalStyles);

function MovieEditPage() {
    const dispatch = useAppDispatch();

    
    useEffect(() => {
        
    }, []);

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