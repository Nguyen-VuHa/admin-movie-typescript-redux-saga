import React from 'react'
import globalStyles from 'utils/globalStyle.module.scss';
import classNames from 'classnames/bind';
import Header from './Header';
import TableCategory from './TableCategory';

const gb = classNames.bind(globalStyles);

function MovieCategoryPage() {

    return (
        <div className={gb('container-main')}>
            <Header />
            <TableCategory />
            <div style={{paddingBottom: '20px'}} />
        </div>
    )
}

export default MovieCategoryPage