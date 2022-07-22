import React, { ReactNode } from 'react'
import Styles from './mainContent.module.scss';
import classNames from 'classnames/bind';
import { IoTrophySharp, IoRefreshSharp } from 'react-icons/io5';
import COLORS from 'constants/colors';

const cx = classNames.bind(Styles);

const styleLayout = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

interface ContentHeaderProps {
    icon?: ReactNode,
    title?: string,
    onRefreshData?: Function,
    onNavigate?: Function,
}

function Header({icon, title = 'TITLE', onRefreshData, onNavigate}: ContentHeaderProps) {

    return (
        <div className={cx('content-header')}>
            <div style={styleLayout}>
                {
                    icon && icon
                }
                <h3 className={cx('ct-header-title')}>
                    { title }
                </h3>
            </div>
            <div style={styleLayout}>
                <div 
                    className={cx('ct-header-button-icon')}
                    onClick={() => onRefreshData && onRefreshData()}
                >
                    <IoRefreshSharp 
                        color="#FFF"
                    />
                </div>
                
                <div 
                    className={cx('ct-header-button')}
                    onClick={() => onNavigate && onNavigate()}
                >
                    xem tất cả
                </div>
            </div>
        </div>
    )
}

export default Header