import React from 'react'
import InputSelect from 'components/Common/InputSelect';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setDataSelectCinema } from 'reducers/cinemaReducer/cinemaSlice';
import InputSelectFetchData from 'components/Common/InputSelectFetchData';
import { STR_API_SELECTED_CINEMA } from 'constants/globalConstant';

function InputSelectCinema() {
    const dispatch = useAppDispatch();

    const { selectCinema, selectSite } = useAppSelector(state => state.cinemaState);

    return (
        <InputSelectFetchData    
            placeholder='-- Chọn rạp chiếu cần xem --'
            url={selectSite ? STR_API_SELECTED_CINEMA : ''}
            propsParams={{
                _site_id: selectSite
            }}
            value={selectCinema}
            onChange={(value: string) => {
                dispatch(setDataSelectCinema(value));
            }}
        />
    )
}

export default React.memo(InputSelectCinema);