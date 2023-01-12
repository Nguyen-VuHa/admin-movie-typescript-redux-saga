import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind';
import Styles from './header.module.scss';
import { IoSearch } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from 'app/hooks';
import HeaderInputSearch from 'components/Common/HeaderInputSearch';
import { setSearchText } from 'reducers/movieReducer/movieSlice';

const cx = classNames.bind(Styles);

function InputSearch() {
    const dispatch = useAppDispatch();
    const { loadingFetch, search } = useAppSelector(state => state.movieState);

    const [txtSearch, settxtSearch] = useState<string>(() => {
        return search || '';
    });

    useEffect(() => {
        let timeOut = setTimeout(() => {
            dispatch(setSearchText(txtSearch))
        }, 500);

        return () => {
            clearTimeout(timeOut);
        };
    }, [txtSearch, dispatch]);


    return (
        <HeaderInputSearch 
            placeholder='Tìm kiếm nhanh'
            loading={loadingFetch && search}
            value={txtSearch}
            onChange={(text: string) => {
                settxtSearch(text);
            }}
        />
    )
}

export default React.memo(InputSearch);