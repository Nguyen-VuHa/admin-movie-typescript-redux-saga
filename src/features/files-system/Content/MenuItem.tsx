import classNames from 'classnames/bind';
import React, { useEffect, useRef } from 'react'
import { IoTrashSharp } from 'react-icons/io5';
import { MdBorderColor } from 'react-icons/md';
import Styles from './content.module.scss';

const cx = classNames.bind(Styles);

interface MenuProps {
    isShow: boolean,
    pageX: any,
    pageY: any,
    setisMenu: Function,
}

function MenuItem({ isShow = false, pageX, pageY, setisMenu }: MenuProps) {
    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.addEventListener('mousedown', (e) => {
            if(buttonRef.current && !buttonRef.current.contains(e.target as Node))
                setisMenu(false);
        });

        return () => {
            window.removeEventListener('mousedown', () => {});
        }
    }, [])
    

    return (
        <div 
            ref={buttonRef}
            className={cx('wrapper-menu', [isShow && 'show'])} 
            style={{
                top: pageY,
                left: pageX
            }}
        >
            <div className={cx('menu-item')}>
                <MdBorderColor 
                    style={{ marginRight: '10px' }}
                />
                Đổi tên thư mục
            </div>
            <div className={cx('menu-item')}>
                <IoTrashSharp 
                    style={{ marginRight: '10px' }}
                />
                Xóa thư mục
            </div>
        </div>
    )
}

export default MenuItem