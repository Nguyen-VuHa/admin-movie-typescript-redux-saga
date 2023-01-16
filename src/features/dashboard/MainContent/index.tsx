import React from 'react'
import Styles from './mainContent.module.scss';
import classNames from 'classnames/bind';
import HotMovie from './HotMovie';

const cx = classNames.bind(Styles);

function MainContent() {
    return (
        <>
            <div className={cx('wrapper-content')}>
                <HotMovie />
                <HotMovie />
            </div>
            <div className={cx('wrapper-content')}>
                <HotMovie />
                <HotMovie />
            </div>
        </>
    )
}

export default MainContent