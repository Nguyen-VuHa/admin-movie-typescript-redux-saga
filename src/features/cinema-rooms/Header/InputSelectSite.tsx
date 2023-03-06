import React from 'react'
import InputSelect from 'components/Common/InputSelect';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setDataSelectSite } from 'reducers/cinemaReducer/cinemaSlice';

function InputSelectSite() {
    const dispatch = useAppDispatch();

    const { sites, selectSite } = useAppSelector(state => state.cinemaState);

    return (
        <InputSelect    
            placeholder='-- Chọn khu vực cần xem --'
            data={sites && sites.length > 0 ? sites.map(s => { return { value: s.id, name: s.siteName }}) : []}
            value={selectSite}
            onChange={(value: number) => {
                dispatch(setDataSelectSite(value));
            }}
            style={{
                margin: '0 5px'
            }}
        />
    )
}

export default React.memo(InputSelectSite);