import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setSearchText } from 'reducers/categoryReducer/categorySlice';
import HeaderInputSearch from 'components/Common/HeaderInputSearch';

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
        <HeaderInputSearch 
            placeholder='Tìm kiếm thể loại phim'
            loading={loadingFetch && search}
            value={txtSearch}
            onChange={(text: string) => {
                settxtSearch(text);
            }}
        />
    )
}

export default React.memo(InputSearch);