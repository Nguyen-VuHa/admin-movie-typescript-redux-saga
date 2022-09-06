import React from 'react'
import styles from './sidebar.module.scss';
import classNames from 'classnames/bind';
import UserDetail from './UserDetail';
import NavMenu from './NavMenu';

const cx = classNames.bind(styles);

export default function MainSideBar() {
    return (
        <div className={cx('container')}>
            <a className={cx('logo')} href="!#">
                <img width={150} src="https://www.tiendauroi.com/wp-content/uploads/2020/02/bhd-star-cinema.png" alt="LOGO_NULL"/>
            </a>

            <UserDetail />
            <NavMenu />

            <div className={cx('sb-copyright')}>
                © copyright by HOTFLIX, 2019—2021. <br/>Created by author
                <a href="https://themeforest.net/user/dmitryvolkov/portfolio" rel="noreferrer" target="_blank">Dmitry Volkov</a>
                <br/>Clone by 
                <a href="https://www.facebook.com/profile.php?id=100005998215977" rel="noreferrer" target="_blank">Hạ Vũ</a>
            </div>
        </div>
    )
}