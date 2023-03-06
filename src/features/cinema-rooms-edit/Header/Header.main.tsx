import React from 'react'
import classNames from 'classnames/bind';
import GlobalStyles from 'utils/globalStyle.module.scss';
import Styles from 'assets/styles/header.style.module.scss';
import { Button } from 'components/Common';
import { IoCaretBack } from 'react-icons/io5';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MdDataSaverOn } from 'react-icons/md';
import { validateDataRoom } from 'middlewares/editCinema';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setMsgErrorDataEditRoom } from 'reducers/cinemaReducer/cinemaSlice';

const gb = classNames.bind(GlobalStyles);
const cx = classNames.bind(Styles);

function HeaderMain() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const idRooms = searchParams.get('id');

    const { dataEditRooms, loadingEdit } = useAppSelector(state => state.cinemaState);
    
    const handleSubmitEdit = () => {
        let resValid = validateDataRoom(dataEditRooms);
        const { status, error } = resValid;

        console.log(status);
        if(status) // check status reponse from function `validateDataCinema`: true => handle submit; false: dispatch message error to store.
        {
            dispatch(setMsgErrorDataEditRoom(error)); // reset message error: error is null

            console.log(status);
            if(idRooms) // check id to distinguish update or create new function
            {
                dispatch({
                    type: 'UPDATED_ROOM',
                    payload: {
                        ...dataEditRooms,
                    }
                })
            } else {
                dispatch({
                    type: 'CREATED_ROOM',
                    payload: {
                        ...dataEditRooms,
                    }
                });
            }
        }
        else {
            dispatch(setMsgErrorDataEditRoom(error));
        }
    }

    return (
        <div className={gb('wrapper-header', cx('sticky-header'))}>
            <div className={gb('header')}>
                <div
                    className={cx('layout-title')}
                >
                    <Button
                        onClick={() => navigate(-1)}
                        style={{width: '45px', height: '45px', marginLeft: 'auto', padding: 0}}
                        title="Quay lại"
                    >
                        <IoCaretBack size={18}/>
                    </Button>
                    <h2 className={cx('title', ['ml-1'])}>
                        {
                            idRooms ? "CẬP NHẬT PHÒNG CHIẾU" : "THÊM MỚI PHÒNG CHIẾU"
                        }
                       
                    </h2>
                </div>
                <div
                    className={cx('layout-title')}
                    style={{width: 'auto', alignItems: 'flex-start'}}
                >
                    <Button
                        onClick={() => handleSubmitEdit()}
                        loading={loadingEdit}
                        loadingText="Đang xử lý..."
                    >
                        { idRooms ? "Cập nhật" : "Lưu lại" }
                        
                        <MdDataSaverOn size={18} style={{ marginLeft: '8px' }}/>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeaderMain