import React from 'react'
import classNames from 'classnames/bind';
import GlobalStyles from 'utils/globalStyle.module.scss';
import Styles from 'assets/styles/header.style.module.scss';
import { Button } from 'components/Common';
import { IoCaretBack } from 'react-icons/io5';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MdDataSaverOn } from 'react-icons/md';
import { validateDataCinema } from 'middlewares/editCinema';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setMsgErrorDataEdit } from 'reducers/cinemaReducer/cinemaSlice';

const gb = classNames.bind(GlobalStyles);
const cx = classNames.bind(Styles);

function HeaderMain() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const idCinema = searchParams.get('id');

    const { dataEditCinema, loadingEdit } = useAppSelector(state => state.cinemaState);
    
    const handleSubmitEdit = () => {
        let resValid = validateDataCinema(dataEditCinema);
        const { status, error } = resValid;

        if(status) // check status reponse from function `validateDataCinema`: true => handle submit; false: dispatch message error to store.
        {
            dispatch(setMsgErrorDataEdit(error));

            if(idCinema) // check id to distinguish update or create new function
            {
                dispatch({
                    type: 'UPDATED_CINEMA',
                    payload: {
                        ...dataEditCinema,
                    }
                })
            } else {
                dispatch({
                    type: 'CREATED_CINEMA',
                    payload: {
                        ...dataEditCinema,
                    }
                });
            }
        }
        else {
            dispatch(setMsgErrorDataEdit(error));
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
                            idCinema ? "CẬP NHẬT CỤM RẠP" : "THÊM MỚI CỤM RẠP"
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
                        { idCinema ? "Cập nhật" : "Lưu lại" }
                        
                        <MdDataSaverOn size={18} style={{ marginLeft: '8px' }}/>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeaderMain