import React from 'react'
import InputSelect from 'components/Common/InputSelect';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setDataSelectCinema } from 'reducers/cinemaReducer/cinemaSlice';

function InputSelectCinema() {
    const dispatch = useAppDispatch();

    const { selectCinema, cinemaCombobox } = useAppSelector(state => state.cinemaState);

    return (
        <InputSelect    
            placeholder='-- Chọn rạp chiếu cần xem --'
            data={cinemaCombobox && cinemaCombobox.length > 0 ? cinemaCombobox.map(c => { return { value: c.id, name: c.cinemaName }}) : []}
            value={selectCinema}
            onChange={(value: string) => {
                dispatch(setDataSelectCinema(value));
            }}
        />
    )
}

export default React.memo(InputSelectCinema);