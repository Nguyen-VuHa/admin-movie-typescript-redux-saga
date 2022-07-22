import React from 'react'
import Styles from './mainContent.module.scss';
import classNames from 'classnames/bind';
import Header from './Header';
import TableCustom from 'components/Common/TableCustom';

const cx = classNames.bind(Styles);


function HotMovie() {
    return (
        <div className={cx('wrapper-items')}>
            <Header />
            <TableCustom />
        </div>
    )
}

export default HotMovie