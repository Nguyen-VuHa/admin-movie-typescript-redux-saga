import React from 'react'
import globalStyles from 'utils/globalStyle.module.scss';
import classNames from 'classnames/bind';
import Header from './Header/Header.main';
import FormDataMain from './FormData/FormData.main';
import { MovieContextProvider } from 'contexts/MovieContext';

const gb = classNames.bind(globalStyles);

function MovieEditPage() {
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