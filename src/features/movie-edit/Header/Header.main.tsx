import React, { useState } from 'react'
import classNames from 'classnames/bind';
import GlobalStyles from 'utils/globalStyle.module.scss';
import Styles from './header.module.scss';
import { Button } from 'components/Common';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IoCaretBack } from "react-icons/io5";
import { MdDataSaverOn } from "react-icons/md";
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { validatorEditMovie } from 'middlewares/editMovie';
import { setErrorFormData, resetErrorFormData } from 'reducers/movieReducer/movieSlice';
import useToastify from 'hooks/useToastify';
import ModalQuestion from 'components/Common/ModalQuestion';
import moviesApi from 'api/movieApi';
import { setLoadingFullScreen } from 'reducers/globalReducer/globalSlice';

const gb = classNames.bind(GlobalStyles);
const cx = classNames.bind(Styles);

function Header() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const idMovie = searchParams.get('id');

    const [modalConfirm, setModalConfirm] = useState<boolean>(false)
    
    const dispatchToast = useToastify();

    const { dataEdit, listPoster } = useAppSelector(state => state.movieState);

    const handleSubmitFormMovie = () => {
        const resultVal = validatorEditMovie(dataEdit);
        if(resultVal && resultVal.status && listPoster.length > 0) {
            dispatch(resetErrorFormData());
            setModalConfirm(true);
        } else {
            if(listPoster.length <= 0) {
                dispatchToast({
                    type: 'TYPE_WARN',
                    payload: {
                        position: 'top-left',
                        message: 'Tối thiểu phải có 1 hình ảnh poster cho bộ phim.',
                    }
                });
            }

            if(resultVal && resultVal.error) {
                dispatch(setErrorFormData(resultVal.error));
                dispatchToast({
                    type: 'TYPE_WARN',
                    payload: {
                        position: 'top-left',
                        message: 'Có một số trường rỗng! Vui lòng kiểm tra lại trước khi xử lý.',
                    }
                });
            }
        }
    }

    const handleSubmitEditMovie = async () => {
        try {
            let arrPoster = [];

            for await(const poster of listPoster) {
                let formData = new FormData();

                formData.append('image', poster.base64);

                let result = await moviesApi.uploadPosterMovie(formData);

                if(result && result.url) {
                    arrPoster.push(result.url);
                }
            }

            dispatch({
                type: 'CREATE_NEW_MOVIE',
                payload: {
                    ...dataEdit,
                    poster: arrPoster
                }
            });

        } catch (error: any) {
            console.log(error, error.message);
            dispatch(setLoadingFullScreen(false));
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
                        handleSubmitEditMovie();
                        dispatch(setLoadingFullScreen(true));
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