import React, { useState, useEffect } from 'react'
import classNames from 'classnames/bind';
import Styles from './header.module.scss';
import { IoSearch } from "react-icons/io5";
import { Triangle } from 'react-loader-spinner';
import COLORS from 'constants/colors';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setSearchText } from 'reducers/categoryReducer/categorySlice';

const cx = classNames.bind(Styles);

function InputSearch() {
    const dispatch = useAppDispatch();
    const { loadingFetch, search } = useAppSelector(state => state.categoryState);

    const [txtSearch, settxtSearch] = useState<string>('');

    useEffect(() => {
        let timeOut = setTimeout(() => {
            dispatch(setSearchText(txtSearch))
        }, 500);

        return () => clearTimeout(timeOut);
    }, [txtSearch])

    return (
        <div style={{ position: 'relative' }}>
            <input
                className={cx('input-search')}
                placeholder="Tìm kiếm thể loại phim"
                value={txtSearch}
                onChange={(e) => {
                    settxtSearch(e.target.value);
                }}
            />
            <div 
                className={cx('button-icon')}
            >
                {
                    loadingFetch && search ? <Triangle
                        height="25"
                        width="25"
                        color={COLORS.YELLOW_PRIMARY}
                        ariaLabel="triangle-loading"
                        visible={true}
                    /> : <IoSearch /> 
                }
            </div>
        </div>
    )
}

export default React.memo(InputSearch);