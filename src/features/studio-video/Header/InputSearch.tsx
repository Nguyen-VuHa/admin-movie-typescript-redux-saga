import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks';
import HeaderInputSearch from 'components/Common/HeaderInputSearch';
import { setSearchText } from 'reducers/movieReducer/movieSlice';

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