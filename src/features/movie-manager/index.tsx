import React from 'react'
import globalStyles from 'utils/globalStyle.module.scss';
import classNames from 'classnames/bind';
import Header from './Header';
import TableMovie from './TableMovie';

const gb = classNames.bind(globalStyles);

function MovieManagerPage() {
    return (
        <div className={gb('container-main')}>
            <Header />
            <TableMovie />
            <div style={{paddingBottom: '20px'}} />
        </div>
    )
}

export default MovieManagerPage