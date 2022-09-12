import React from 'react'
import classNames from 'classnames/bind';
import GlobalStyles from 'utils/globalStyle.module.scss';
import Styles from './header.module.scss';
import InputSearch from './InputSearch';
import GroupControl from './GroupControl';
import { useAppSelector } from 'app/hooks';

const gb = classNames.bind(GlobalStyles);
const cx = classNames.bind(Styles);

function Header() {
    const { categories } = useAppSelector(state => state.categoryState);

    return (
        <div className={gb('wrapper-header', cx('sticky-header'))}>
            <div className={gb('header')}>
                <div
                    className={cx('layout-title')}
                >
                    <h2 className={cx('title')}>Thể Loại</h2>
                    <span className={cx('total-text')}>{ categories.length } thể loại</span>
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