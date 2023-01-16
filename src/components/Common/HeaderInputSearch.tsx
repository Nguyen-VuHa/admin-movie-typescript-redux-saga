import React, { useCallback } from 'react'
import Styles from 'assets/styles/input-search.style.module.scss';
import classNames from 'classnames/bind';
import { RotatingSquare } from 'react-loader-spinner';
import COLORS from 'constants/colors';
import { IoSearch } from 'react-icons/io5';

const cx = classNames.bind(Styles);

interface HeaderInputSearchProps {
    loading?: any,
    placeholder?: string,
    value: string,
    onChange: Function,
}

function HeaderInputSearch({
    loading = false,
    value = "",
    placeholder = "Nhập tìm kiếm...",
    onChange
}: HeaderInputSearchProps) {

    const handleChangeInput = useCallback((text: string) => {
        onChange && onChange(text);
    },[]);
    

    return (
        <div style={{ position: 'relative' }}>
            <input
                className={cx('input-search')}
                placeholder={placeholder}
                value={value}
                onChange={(e) => {
                    handleChangeInput(e.target.value);
                }}
            />
            <div 
                className={cx('button-icon')}
            >
                {
                    loading ? 
                    <RotatingSquare
                        height="30"
                        width="30"
                        color={COLORS.YELLOW_PRIMARY}
                        ariaLabel="rotating-square-loading"
                        strokeWidth="4"
                        visible={true}
                    />
                    : <IoSearch 
                        style={{ marginTop: '3px'}}
                    /> 
                }
            </div>
        </div>
    )
}

export default React.memo(HeaderInputSearch);