import React, { useEffect } from 'react'
import globalStyles from 'utils/globalStyle.module.scss';
import classNames from 'classnames/bind';
import HeaderMain from './Header/Header.main';
import FormDataMain from './FormData/FormData.main';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { clearDataEditRoom, setDefaultStatus, setFormCinemaId } from 'reducers/cinemaReducer/cinemaSlice';
import { STATUS_FAILED, STATUS_SUCCESS } from 'constants/status';
import useToastify from 'hooks/useToastify';
import { useNavigate, useSearchParams } from 'react-router-dom';

const gb = classNames.bind(globalStyles);

function CinemaRoomEditMain() {
    const [searchParams] = useSearchParams();
    const idRoom = searchParams.get('id');

    const navigate = useNavigate();
    const dispatchToast = useToastify();
    const dispatch = useAppDispatch();

    const { sites, selectSite, statusEdited, errorMessage } = useAppSelector(state => state.cinemaState);

    useEffect(() => {
        /*
            Check `sites` exists
            - true: don't fetch data `sites`
            - false: fetch data `sites`
        */
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

            dispatch(setFormCinemaId(''));
            
        } else {
            dispatch(setFormCinemaId(''));
        }
    }, [selectSite]);

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
                    message: `${idRoom ? "updated" : "created"} room success.`,
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
            re-render according to params `idRoom`
            - is valid: fetch data cinema by `idRoom`
            - is null: does not fecth data
        */
        if(idRoom) {
            dispatch({
                type: 'FETCH_DETAIL_ROOM_BY_ID',
                payload: idRoom,
            });
        } else {
            dispatch(clearDataEditRoom());
        }
    }, [idRoom, dispatch]);

    
    return (
        <div className={gb('container-main')}>
            <HeaderMain />
            <FormDataMain />
        </div>
    )
}

export default CinemaRoomEditMain