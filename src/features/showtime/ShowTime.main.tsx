import React, { useEffect } from 'react'
import globalStyles from 'utils/globalStyle.module.scss';
import classNames from 'classnames/bind';
import HeaderMain from './Header/Header.main';
import TableShowtimeMain from './TableShowtime/TableShowtime.main';
import { useAppDispatch, useAppSelector } from 'app/hooks';

const gb = classNames.bind(globalStyles);

function ShowTimeMain() {
    const dispatch = useAppDispatch();

    const { currentPage } = useAppSelector(state => state.showtimeState);

    /**
     * Render firt time
     * - Fetch data showtimes
     * 
     * Re-Render according `currentPage` in showtimeState on store
     * - Fetch data when there is an argument change `despenc`
     */
    useEffect(() => {
        dispatch({
            type: "FETCH_LIST_SHOWTIME",
            payload: {
                page: currentPage,
                code: '',
                movieId: '',
                roomId: '',
            }
        });
    }, [currentPage])
    

    return (
        <div className={gb('container-main')}>
            <HeaderMain />
            <TableShowtimeMain />
        </div>
    )
}

export default ShowTimeMain