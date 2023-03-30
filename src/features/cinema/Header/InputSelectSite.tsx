import React from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setDataSelectSite } from 'reducers/cinemaReducer/cinemaSlice';
import InputSelectFetchData from 'components/Common/InputSelectFetchData';
import { STR_API_SELECTED_SITE } from 'constants/globalConstant';

function InputSelectSite() {
    const dispatch = useAppDispatch();

    const { selectSite } = useAppSelector(state => state.cinemaState);

    return (
        <InputSelectFetchData    
            placeholder='-- Chọn khu vực cần xem --'
            url={STR_API_SELECTED_SITE}
            value={selectSite}
            onChange={(value: number) => {
                dispatch(setDataSelectSite(value));
            }}
        />
    )
}

export default React.memo(InputSelectSite);