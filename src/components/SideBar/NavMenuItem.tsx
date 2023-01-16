import React, { ReactNode } from 'react'
import classNames from 'classnames/bind';
import styles from './sidebar.module.scss';
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

type NavMenuItemProps = {
    icon?: ReactNode,
    menuName?: string,
    active?: boolean,
    navigation?: string,
}

function NavMenuItem({ icon = <></>, menuName = 'Menu Name...', active = false, navigation = "!#" }: NavMenuItemProps) {
    
    return (
        <li className={cx('sb-navbar-item')}>
            <Link to={navigation} className={cx('sb-link', active && 'active')}>
                { icon && icon }
                <span>{ menuName }</span>
            </Link>
        </li>
    )
}

export default React.memo(NavMenuItem);