import React from 'react'
import classNames from 'classnames/bind';
import GlobalStyles from 'utils/globalStyle.module.scss';
import Styles from './header.module.scss';
import SortBy from './SortBy';
import Input from 'components/Common/Input';
import InputSearch from './InputSearch';

const gb = classNames.bind(GlobalStyles);
const cx = classNames.bind(Styles);

function Header() {
    return (
        <div className={gb('wrapper-header', cx('sticky-header'))}>
            <div className={gb('header')}>
                <div
                    className={cx('layout-title')}
                >
                    <h2 className={cx('title')}>Quản Lý Phim</h2>
                    <span className={cx('total-text')}>14,452 phim</span>
                </div>
                <div
                    className={cx('layout-title')}
                    style={{width: 'auto', alignItems: 'flex-start'}}
                >
                    <SortBy />
                    <InputSearch />
                </div>
            </div>
        </div>
    )
}

export default Header