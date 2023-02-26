import React from 'react'
import classNames from 'classnames/bind';
import GlobalStyles from 'utils/globalStyle.module.scss';
import Styles from 'assets/styles/header.style.module.scss';

const gb = classNames.bind(GlobalStyles);
const cx = classNames.bind(Styles);

function Header() {
    return (
        <div className={gb('wrapper-header')}>
            <div className={gb('header')}>
                <h2 className={cx('title')}>Trang Chủ</h2>
            </div>
        </div>
    )
}

export default Header