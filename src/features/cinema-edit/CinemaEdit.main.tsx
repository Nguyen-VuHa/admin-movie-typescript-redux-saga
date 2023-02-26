import React, { useEffect } from 'react'
import globalStyles from 'utils/globalStyle.module.scss';
import classNames from 'classnames/bind';
import HeaderMain from './Header/Header.main';
import FormDataMain from './FormData/FormData.main';
import { useAppSelector } from 'app/hooks';
import { useDispatch } from 'react-redux';
import { STATUS_SUCCESS, STATUS_FAILED } from 'constants/status';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setDefaultStatus } from 'reducers/cinemaReducer/cinemaSlice';
import useToastify from 'hooks/useToastify';

const gb = classNames.bind(globalStyles);


function CinemaEditMain() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dispatchToast = useToastify();

    const [searchParams] = useSearchParams();
    const idCinema = searchParams.get('id');
    
    const { areas, statusEdited, errorMessage } = useAppSelector(state => state.cinemaState);
    
    useEffect(() => {
        /*
            first render: check `areas` exists data on store
            - true: do not fetch data area 
            - false: dispatch fetch data area
        */
        if(!areas || areas.length <= 0)
            dispatch({ type: 'FETCH_LOCAL_ADDRESS' });
        
    }, []);

    useEffect(() => {
        /*
            re-render according to `statusEdited`
            - statusEdited === STATUS_SUCCESS: created success and handle show toast success, navigate go back
            - statusEdited === STATUS_FAILED: created failed and handle show toast error
        */
        if(statusEdited === STATUS_SUCCESS) {
            dispatch(setDefaultStatus());
            dispatchToast({
                type: 'TYPE_SUCCESS',
                payload: {
                    position: 'top-left',
                    message: `${idCinema ? "updated" : "created"} new cinema success.`,
                }
            });
            navigate(-1);
        }

        if(statusEdited === STATUS_FAILED) {
            dispatch(setDefaultStatus());
            dispatchToast({
                type: 'TYPE_ERROR',
                payload: {
                    position: 'top-left',
                    message: errorMessage,
                }
            });
        }
    }, [statusEdited]);
    
    useEffect(() => {
        /*
            re-render according to params `idCinema`
            - is valid: fetch data cinema by `idCinema`
            - is null: do not fecth data
        */
        if(idCinema) {
            dispatch({
                type: 'FETCH_CINEMA_BY_ID',
                payload: idCinema,
            });
        }
    }, [idCinema, dispatch]);

    return (
        <div className={gb('container-main')}>
            <HeaderMain />
            <FormDataMain />
        </div>
    )
}

export default CinemaEditMain