import React from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setDataSelectCinema, setDataSelectSite } from 'reducers/cinemaReducer/cinemaSlice';
import InputSelectFetchData from 'components/Common/InputSelectFetchData';
import { STR_API_SELECTED_SITE } from 'constants/globalConstant';

function InputSelectSite() {
    const dispatch = useAppDispatch();

    const { selectSite } = useAppSelector(state => state.cinemaState);

    return (
        <InputSelectFetchData    
            placeholder='-- Chọn khu vực cần xem --'
            value={selectSite}
            url={STR_API_SELECTED_SITE}
            onChange={(value: number) => {
                dispatch(setDataSelectCinema(null));
                dispatch(setDataSelectSite(value));
            }}
            style={{
                margin: '0 5px'
            }}
        />
    )
}

export default React.memo(InputSelectSite);