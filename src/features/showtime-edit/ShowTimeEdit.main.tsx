import React, { useEffect } from 'react'
import globalStyles from 'utils/globalStyle.module.scss';
import classNames from 'classnames/bind';
import Header from './Header/Header.main';
import FormDataMain from './FormData/FormData.main';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { STATUS_FAILED, STATUS_SUCCESS } from 'constants/status';
import useToastify from 'hooks/useToastify';
import { resetFormEditShowtime, setDefaultStatusEditShowTime } from 'reducers/showtimeReducer/showtimeSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';

const gb = classNames.bind(globalStyles);

function ShowTimeEditPage() {
    const dispatchToast = useToastify();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const idShowtime = searchParams.get('id'); // get params in hook useSearchParams
    
    const { statusEdit, errorMessage } = useAppSelector(state => state.showtimeState);

    useEffect(() => {
        /*
            re-render according to `statusEdit`
            - statusEdit === STATUS_SUCCESS: created success and handle show toast success, navigate go back
            - statusEdit === STATUS_FAILED: created failed and handle show toast error
        */
            if(statusEdit === STATUS_SUCCESS) {
                dispatch(setDefaultStatusEditShowTime());
                dispatch(resetFormEditShowtime());
                dispatchToast({
                    type: 'TYPE_SUCCESS',
                    payload: {
                        position: 'top-left',
                        message: `${idShowtime ? "updated" : "created"} showtime success.`,
                    }
                });
                navigate(-1);
            }
    
            if(statusEdit === STATUS_FAILED) {
                dispatch(setDefaultStatusEditShowTime());
                dispatchToast({
                    type: 'TYPE_ERROR',
                    payload: {
                        position: 'top-left',
                        message: errorMessage,
                    }
                });
            }
    }, [statusEdit])


    
    return (
        <div className={gb('container-main')}>
            <Header />
            <FormDataMain />
        </div>
    )
}

export default ShowTimeEditPage