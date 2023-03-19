import React from 'react'
import classNames from 'classnames/bind';
import GlobalStyles from 'utils/globalStyle.module.scss';
import Styles from 'assets/styles/header.style.module.scss';
import { Button } from 'components/Common';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IoCaretBack } from "react-icons/io5";
import { MdDataSaverOn } from "react-icons/md";

const gb = classNames.bind(GlobalStyles);
const cx = classNames.bind(Styles);

function Header() {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const idShowtime = searchParams.get('id');

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
                        // onClick={() => handleSubmitFormMovie()}
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