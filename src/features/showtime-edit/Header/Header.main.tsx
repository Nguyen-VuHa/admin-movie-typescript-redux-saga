import React from 'react'
import classNames from 'classnames/bind';
import GlobalStyles from 'utils/globalStyle.module.scss';
import Styles from 'assets/styles/header.style.module.scss';
import { Button } from 'components/Common';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IoCaretBack } from "react-icons/io5";
import { MdDataSaverOn } from "react-icons/md";
import { validatorEditShowtime } from 'middlewares/editShowtime';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import useToastify from 'hooks/useToastify';
import { setErrorFormData } from 'reducers/showtimeReducer/showtimeSlice';

const gb = classNames.bind(GlobalStyles);
const cx = classNames.bind(Styles);

function Header() {
    const dispatchToast = useToastify();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [searchParams] = useSearchParams();
    const idShowtime = searchParams.get('id'); // get params in hook useSearchParams

    const { dataEdit } = useAppSelector(state => state.showtimeState);

    const hanldeSumitEdit = () => {
        const resultValid = validatorEditShowtime(dataEdit);
        const { status, error } = resultValid;
        if(status) {
            dispatch(setErrorFormData(error));

            if(idShowtime) // check id to distinguish update or create new function
            {
                // dispatch({
                //     type: 'UPDATED_CINEMA',
                //     payload: {
                //         ...dataEditCinema,
                //     }
                // })
            } else {
                dispatch({
                    type: 'CREATE_SHOWTIME',
                    payload: {
                        ...dataEdit,
                    }
                });
            }
        } else {
            if(error) {
                dispatch(setErrorFormData(error));
                
                dispatchToast({
                    type: 'TYPE_WARN',
                    payload: {
                        position: 'top-left',
                        message: 'Có một số trường không hợp lệ! Vui lòng kiểm tra lại trước khi xử lý.',
                    }
                });
            }
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
                            idShowtime ? 'Cập nhật suất chiếu' : 'Thêm Mới suất chiếu'
                        }
                    </h2>
                </div>
                <div
                    className={cx('layout-title')}
                    style={{width: 'auto', alignItems: 'flex-start'}}
                >
                    <Button
                        onClick={() => hanldeSumitEdit()}
                    >
                        {idShowtime ? 'Cập nhật' : 'Lưu lại'}
                        <MdDataSaverOn size={18} style={{ marginLeft: '8px' }}/>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Header