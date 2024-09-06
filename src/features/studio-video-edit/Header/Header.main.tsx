import { useAppDispatch } from 'app/hooks';
import Styles from 'assets/styles/header.style.module.scss';
import classNames from 'classnames/bind';
import { Button } from 'components/Common';
import ModalQuestion from 'components/Common/ModalQuestion';
import { useState } from 'react';
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoCaretBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { setLoadingFullScreen } from 'reducers/globalReducer/globalSlice';
import GlobalStyles from 'utils/globalStyle.module.scss';

const gb = classNames.bind(GlobalStyles);
const cx = classNames.bind(Styles);

function Header() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [modalConfirm, setModalConfirm] = useState<boolean>(false)
    
    const handleSubmitFormMovie = () => {
        setModalConfirm(true);
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
                    <h2 className={cx('title', ['ml-1'])}>
                        Tải lên video
                    </h2>
                </div>
                <div
                    className={cx('layout-title')}
                    style={{width: 'auto', alignItems: 'flex-start'}}
                >
                    <Button
                        onClick={() => handleSubmitFormMovie()}
                    >
                        Upload
                        <AiOutlineCloudUpload size={18} style={{ marginLeft: '8px' }}/>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Header