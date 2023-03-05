import { useAppDispatch, useAppSelector } from 'app/hooks';
import classNames from 'classnames';
import React, { useEffect } from 'react'
import { clearCinemaCombobox, clearCinemas, clearRooms, setDataSelectCinema } from 'reducers/cinemaReducer/cinemaSlice';
import globalStyles from 'utils/globalStyle.module.scss';
import HeaderMain from './Header/Header.main';
import TableRoomMain from './TableRoom/TableRoom.main';

const gb = classNames.bind(globalStyles);

function CinemaRoomMain() {
    const dispatch = useAppDispatch();
    const { selectCinema, selectSite, sites, currentPageRooms } = useAppSelector(state => state.cinemaState);

    useEffect(() => {
        if(!sites || sites.length <= 0) {
            dispatch({
                type: 'FETCH_ALL_SITES'
            });
        }
    }, [sites]);
    
     useEffect(() => {
        /*
            Check `selectSite` exists
            - true: fetch `cinemas` by `selectSite`
            - false: dispatch clear `cinemas` on store
        */
        
        if(selectSite)
        {   
            dispatch({
                type: 'FETCH_CINEMA_SELECT_BY_SITE_ID',
                payload: selectSite,
            });
            dispatch(setDataSelectCinema(null));
            dispatch(clearCinemaCombobox());
            
        } else {

            dispatch(clearCinemas());
            dispatch(setDataSelectCinema(null));
            dispatch(clearCinemaCombobox());
        }
    }, [selectSite]);

    useEffect(() => {
        /*
            Check `selectCinema` exists
            - true: fetch `rooms` by `selectCinema`
            - false: dispatch clear `rooms` on store
        */
        if(selectCinema) {
            dispatch({
                type: 'FETCH_ROOM_BY_CINEMA_ID',
                payload: {
                    siteId: selectSite,
                    id: selectCinema,
                    currentPage: currentPageRooms,
                }
            });
        } else {
            dispatch(clearRooms());
        }
    }, [selectCinema])
    

    return (
        <div className={gb('container-main')}>
            <HeaderMain />
            <TableRoomMain />
        </div>  
    )
}

export default CinemaRoomMain