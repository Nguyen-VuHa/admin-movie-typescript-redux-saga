import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks';
import HeaderInputSearch from 'components/Common/HeaderInputSearch';
import { setVideoParams } from 'reducers/studioVideoReducer/studioVideoSlice';

function InputSearch() {
    const dispatch = useAppDispatch();
    const { isFetchVideoList, videoParams } = useAppSelector(state => state.studioVideoState);
    const { search } = videoParams

    const [txtSearch, settxtSearch] = useState<string>(() => {
        return search || '';
    });

    useEffect(() => {
        let timeOut = setTimeout(() => {
            dispatch(setVideoParams({
                search: txtSearch
            }))
        }, 500);

        return () => {
            clearTimeout(timeOut);
        };
    }, [txtSearch, dispatch]);


    return (
        <HeaderInputSearch 
            placeholder='Tìm kiếm theo tiêu đề'
            loading={isFetchVideoList && search}
            value={txtSearch}
            onChange={(text: string) => {
                settxtSearch(text);
            }}
        />
    )
}

export default React.memo(InputSearch);