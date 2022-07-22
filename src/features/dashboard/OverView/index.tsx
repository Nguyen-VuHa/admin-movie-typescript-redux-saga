import React from 'react'
import Styles from './overview.module.scss';
import classNames from 'classnames/bind';
import OverViewItem from './OverViewItem';

const cx = classNames.bind(Styles);

function OverView() {
    return (
        <div className={cx('wrapper')}>
            <OverViewItem />
            <OverViewItem />
            <OverViewItem />
            <OverViewItem />
        </div>
    )
}

export default OverView