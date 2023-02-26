import React, { useEffect } from 'react'
import globalStyles from 'utils/globalStyle.module.scss';
import classNames from 'classnames/bind';
import HeaderMain from './Header/Header.main';
import FormDataMain from './FormData/FormData.main';
import { useAppSelector } from 'app/hooks';
import { useDispatch } from 'react-redux';
import { STATUS_SUCCESS, STATUS_FAILED } from 'constants/status';
import { useNavigate } from 'react-router-dom';
import { setDefaultStatus } from 'reducers/cinemaReducer/cinemaSlice';
import useToastify from 'hooks/useToastify';

const gb = classNames.bind(globalStyles);


function CinemaEditMain() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dispatchToast = useToastify();
    
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
                    message: 'created new cinema success.',
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
    }, [statusEdited])
    
    

    return (
        <div className={gb('container-main')}>
            <HeaderMain />
            <FormDataMain />
        </div>
    )
}

export default CinemaEditMain