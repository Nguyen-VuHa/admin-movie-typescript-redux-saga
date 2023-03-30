import React, { useEffect } from 'react'
import globalStyles from 'utils/globalStyle.module.scss';
import classNames from 'classnames/bind';
import HeaderMain from './Header/Header.main';
import TableCinemaMain from './TableCinema/TableCinema.main';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { clearCinemas } from 'reducers/cinemaReducer/cinemaSlice';

const gb = classNames.bind(globalStyles);


function CinemaMain() { 
    const dispatch = useAppDispatch();

    const { selectSite, currentPage } = useAppSelector(state => state.cinemaState);

    /*
        Handle call api with `selectSite` change:
        - Fetch cinema by site id
    */
    useEffect(() => {
        /*
            Check `selectSite` exists
            - true: fetch `cinemas` by `selectSite`
            - false: dispatch clear `cinemas` on store
        */
        if(selectSite)
        {   
            dispatch({
                type: 'FETCH_CINEMA_BY_SITE_ID',
                payload: {
                    id: selectSite,
                    currentPage,
                },
            })
        } else {
            dispatch(clearCinemas());
        }
    }, [selectSite]);
    

    return (
        <div className={gb('container-main')}>
            <HeaderMain />
            <TableCinemaMain />
        </div>
    );
};

export default CinemaMain;