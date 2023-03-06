import React from 'react'
import classNames from 'classnames/bind';
import GlobalStyles from 'utils/globalStyle.module.scss';
import Styles from 'assets/styles/header.style.module.scss';

import { useAppSelector } from 'app/hooks';
import GroupControl from './GroupControl';
import InputSelectSite from './InputSelectSite';
import InputSelectCinema from './InputSelectCinema';

const gb = classNames.bind(GlobalStyles);
const cx = classNames.bind(Styles);

function HeaderMain() {
    const { totalRowsRooms } = useAppSelector(state => state.cinemaState);

    return (
        <div className={gb('wrapper-header', cx('sticky-header'))}>
            <div className={gb('header')}>
                <div
                    className={cx('layout-title')}
                >
                    <h2 className={cx('title')}>Quản lí phòng chiếu</h2>
                    <span className={cx('total-text')}>{ totalRowsRooms } phòng chiếu</span>
                </div>
                <div
                    className={cx('layout-title')}
                    style={{width: 'auto', alignItems: 'flex-start'}}
                >
                    <GroupControl />
                    <InputSelectSite />
                    <InputSelectCinema />
                </div>
            </div>
        </div>
    );
};

export default HeaderMain;