import React from 'react'
import classNames from 'classnames/bind';
import Styles from './header.module.scss';
import { IoSearch } from "react-icons/io5";

const cx = classNames.bind(Styles);

function InputSearch() {
    return (
        <div style={{ position: 'relative' }}>
            <input
                className={cx('input-search')}
                placeholder="Tìm kiếm"
            />
            <div 
                className={cx('button-icon')}
            >
                <IoSearch />
            </div>
        </div>
    )
}

export default React.memo(InputSearch);