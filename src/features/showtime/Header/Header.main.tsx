import React from 'react'
import classNames from 'classnames/bind';
import GlobalStyles from 'utils/globalStyle.module.scss';
import Styles from 'assets/styles/header.style.module.scss';
import GroupControl from './GroupControl';
import { useAppSelector } from 'app/hooks';

const gb = classNames.bind(GlobalStyles);
const cx = classNames.bind(Styles);

function HeaderMain() {
    const { totalRows } = useAppSelector(state => state.showtimeState);

    return (
        <div className={gb('wrapper-header', cx('sticky-header'))}>
            <div className={gb('header')}>
                <div
                    className={cx('layout-title')}
                >
                    <h2 className={cx('title')}>Quản lý suất chiếu</h2>
                    <span className={cx('total-text')}>{ totalRows } suất chiếu</span>
                </div>
                <div
                    className={cx('layout-title')}
                    style={{width: 'auto', alignItems: 'flex-start'}}
                >
                    <GroupControl />
                </div>
            </div>
        </div>
    );
};

export default HeaderMain;