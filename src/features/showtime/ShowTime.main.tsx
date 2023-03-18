import React from 'react'
import globalStyles from 'utils/globalStyle.module.scss';
import classNames from 'classnames/bind';
import HeaderMain from './Header/Header.main';
import TableShowtimeMain from './TableShowtime/TableShowtime.main';

const gb = classNames.bind(globalStyles);

function ShowTimeMain() {
    return (
        <div className={gb('container-main')}>
            <HeaderMain />
            <TableShowtimeMain />
        </div>
    )
}

export default ShowTimeMain