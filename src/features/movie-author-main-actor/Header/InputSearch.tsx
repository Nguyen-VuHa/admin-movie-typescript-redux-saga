import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setAuthorActorSearch } from 'reducers/authorActorReducer/authorActorSlice';
import HeaderInputSearch from 'components/Common/HeaderInputSearch';

function InputSearch() {
    const dispatch = useAppDispatch();
    const { loadingFetch, search } = useAppSelector(state => state.authorActorState);

    const [txtSearch, setTxtSearch] = useState(() => {
        return search || '';
    });

    useEffect(() => {
        let timeOut = setTimeout(() => {
            dispatch(setAuthorActorSearch(txtSearch))
        }, 500);

        return () => {
            clearTimeout(timeOut);
        };
    }, [txtSearch])
    
    return (
        <HeaderInputSearch 
            placeholder='Tìm kiếm nhanh'
            loading={loadingFetch && search}
            value={txtSearch}
            onChange={(text: string) => {
                setTxtSearch(text);
            }}
        />
    )
}

export default React.memo(InputSearch);