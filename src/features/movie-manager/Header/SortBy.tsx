import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind';
import Styles from './header.module.scss';

const cx = classNames.bind(Styles);

function SortBy() {
    const buttonRef = useRef<any>(null);
    const [isShow, setisShow] = useState<boolean>(false);
    const [nameFilter, setNameFilter] = useState<string>('Ngày tạo');

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (buttonRef.current && !buttonRef.current?.contains(event.target)) {
                setisShow(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div 
            style={{ 
                display: 'flex', 
                justifyContent: 'flex-start', 
                alignItems: 'flex-start', 
                flexDirection: 'column', 
                position: 'relative' 
            }}
            ref={buttonRef}
        >
            <span className={cx('text')} style={{margin: 0}}>Sắp xếp theo:</span>
            <div
                onClick={() => {
                    setisShow(!isShow);
                }}
                className={cx('filter-item-btn', isShow && 'show')}
            >
                <div className={cx('filter-item')}>
                    { nameFilter }
                </div>
                <span className={cx('span-icon')} />
            </div>
            <ul className={cx('filter-drop-menu', isShow && 'show')}>
                <li onClick={() => { setNameFilter('Ngày tạo'); setisShow(false) }}>Ngày tạo</li>
                <li onClick={() => { setNameFilter('Điểm hạng'); setisShow(false) }}>Điểm hạng</li>
                <li onClick={() => { setNameFilter('Doanh thu'); setisShow(false) }}>Doanh thu</li>
            </ul>
        </div>
    )
}

export default SortBy