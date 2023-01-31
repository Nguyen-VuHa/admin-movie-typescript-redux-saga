import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind';
import GlobalStyles from 'utils/globalStyle.module.scss';
import Styles from './header.module.scss';
import { Button } from 'components/Common';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IoCaretBack } from "react-icons/io5";
import { MdDataSaverOn } from "react-icons/md";
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { validatorEditMovie } from 'middlewares/editMovie';
import { setErrorFormData, resetFormEditMovie } from 'reducers/movieReducer/movieSlice';
import useToastify from 'hooks/useToastify';
import ModalQuestion from 'components/Common/ModalQuestion';
import LoadingFullScreem from 'components/Common/LoadingFullScreem';

const gb = classNames.bind(GlobalStyles);
const cx = classNames.bind(Styles);

function Header() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const idMovie = searchParams.get('id');

    const [modalConfirm, setModalConfirm] = useState<boolean>(false)
    
    const dispatchToast = useToastify();

    const { dataEdit, listPoster, statusCreated, errorMessage } = useAppSelector(state => state.movieState);
    
    useEffect(() => {
        if(statusCreated === 1) {
            dispatchToast({
                type: 'TYPE_SUCCESS',
                payload: {
                    position: 'top-left',
                    message: 'Tạo mới phim thành công!',
                }
            });

            dispatch(resetFormEditMovie());
            navigate(-1);
        }

        if(statusCreated === 2) {
            dispatchToast({
                type: 'TYPE_ERROR',
                payload: {
                    position: 'top-left',
                    message: errorMessage,
                }
            });
        }
    }, [statusCreated])
    

    const handleSubmitFormMovie = async () => {
        const resultVal = validatorEditMovie(dataEdit);
        setModalConfirm(true);
        if(resultVal && resultVal.status && listPoster.length > 0) {
            
        } else {
            // if(listPoster.length <= 0) {
            //     dispatchToast({
            //         type: 'TYPE_WARN',
            //         payload: {
            //             position: 'top-left',
            //             message: 'Tối thiểu phải có 1 hình ảnh poster cho bộ phim.',
            //         }
            //     });
            // }

            // if(resultVal && resultVal.error) {
            //     dispatch(setErrorFormData(resultVal.error));
            //     dispatchToast({
            //         type: 'TYPE_WARN',
            //         payload: {
            //             position: 'top-left',
            //             message: 'Có một số trường rỗng! Vui lòng kiểm tra lại trước khi xử lý.',
            //         }
            //     });
            // }
        }
    }

    return (
        <div className={gb('wrapper-header', cx('sticky-header'))}>
            {
                modalConfirm && <ModalQuestion 
                    status={modalConfirm}
                    title="THÔNG BÁO"
                    textConfirm={'Quá trình này có thể xảy ra lâu!' + '\n' + 'Vui lòng không tắt trình duyệt khi đang thực hiện.'}
                    onClose={() => {
                        setModalConfirm(false);
                    }}
                    onSave={() => {
                        setModalConfirm(false);
                    }}
                />
            }
            
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
                    <h2 className={cx('title')}>
                        {
                            idMovie ? 'Cập nhật phim' : 'Thêm Mới Phim'
                        }
                    </h2>
                </div>
                <div
                    className={cx('layout-title')}
                    style={{width: 'auto', alignItems: 'flex-start'}}
                >
                    <Button
                        onClick={() => handleSubmitFormMovie()}
                    >
                        Lưu lại
                        <MdDataSaverOn size={18} style={{ marginLeft: '8px' }}/>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Header