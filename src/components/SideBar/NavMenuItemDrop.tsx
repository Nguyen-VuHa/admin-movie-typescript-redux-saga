import React, { ReactNode, useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind';
import styles from './sidebar.module.scss';
import { IoCaretForward, IoEllipse } from "react-icons/io5";
import { useLocation, useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

interface MenuDropObject{
    menuName?: string,
    navigateLink: string,
}

interface NavMenuItemDropProps {
    icon?: ReactNode,
    menuName?: string,
    active?: boolean,
    navigation?: string,
    menuDrop?: Array<MenuDropObject>,
}

function NavMenuItemDrop({ icon, menuName, menuDrop }: NavMenuItemDropProps) {
    const [statusDrop, setStatusDrop] = useState<boolean>(false);
    const itemRef = useRef<HTMLLIElement>(null);
    const location = useLocation();
    const navigation = useNavigate();

    return (
        <li className={cx('sb-navbar-item-drop')}>
            <div className={cx('sb-navbar-item')} style={{marginBottom: 0}} onClick={() => {
                setStatusDrop(!statusDrop);
            }}>
                <div className={cx('sb-link', statusDrop && 'active')} >
                    { icon && icon }
                    <span>{ menuName }</span>
                </div>
                <div className={cx('nav-item-drop-icon', statusDrop && 'drop', statusDrop && 'active')}>
                    <IoCaretForward size={15} color="#fff"/>
                </div>
            </div>
            
            <ul className={cx('sidebar-menu-cld', statusDrop && 'show')} style={ statusDrop ? {height: `${itemRef && itemRef.current && itemRef.current?.offsetHeight * (menuDrop && menuDrop.length || 0) + 20 * 3}px`} : {height: 0}} >
                {
                    menuDrop && menuDrop.length > 0
                    && menuDrop.map((md, index) => {
                        return <li 
                            className={cx('sidebar-menu-cld-item', location.pathname.includes(md.navigateLink) && "active")} 
                            ref={itemRef} key={index}
                            onClick={() => {
                                if(!location.pathname.includes(md.navigateLink))
                                    navigation(md.navigateLink);
                            }}
                        >
                            <span>{ md.menuName }</span>
                        </li>
                    })
                }
            </ul>
        </li>
    )
}

export default NavMenuItemDrop