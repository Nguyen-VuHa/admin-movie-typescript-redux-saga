import React from 'react'
import classNames from 'classnames/bind';
import GlobalStyles from 'utils/globalStyle.module.scss';
import Styles from 'assets/styles/header.style.module.scss';
import InputSearch from './InputSearch';
import GroupControl from './GroupControl';
import { useAppSelector } from 'app/hooks';

const gb = classNames.bind(GlobalStyles);
const cx = classNames.bind(Styles);

function Header() {
    const { totalRows } = useAppSelector(state => state.authorActorState);

    return (
        <div className={cx('sticky-header', [ gb('wrapper-header') ])}>
            <div className={gb('header')}>
                <div
                    className={cx('layout-title')}
                >
                    <h2 className={cx('title')}>Đạo diễn / Diễn viên</h2>
                    <span className={cx('total-text')}>{ totalRows } Đạo diễn / diễn viên</span>
                </div>
                <div
                    className={cx('layout-title')}
                    style={{width: 'auto', alignItems: 'flex-start'}}
                >
                    <GroupControl />
                    <InputSearch />
                </div>
            </div>
        </div>
    )
}

export default Header