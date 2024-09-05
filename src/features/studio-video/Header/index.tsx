import React from 'react'
import classNames from 'classnames/bind';
import GlobalStyles from 'utils/globalStyle.module.scss';
import Styles from 'assets/styles/header.style.module.scss';
import InputSearch from './InputSearch';
import { useAppSelector } from 'app/hooks';
import { Button } from 'components/Common';
import { IoAddSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const gb = classNames.bind(GlobalStyles);
const cx = classNames.bind(Styles);

function Header() {
    const navigate = useNavigate();
    const { totalRows } = useAppSelector(state => state.movieState);

    return (
        <div className={gb('wrapper-header', cx('sticky-header'))}>
            <div className={gb('header')}>
                <div
                    className={cx('layout-title')}
                >
                    <h2 className={cx('title')}>Studio Video</h2>
                    <span className={cx('total-text')}>{ totalRows } videos</span>
                </div>
                <div
                    className={cx('layout-title')}
                    style={{ width: 'auto', alignItems: 'flex-start' }}
                >
                    <InputSearch />
                    <Button 
                        style={{ marginLeft: '1rem' }}
                        onClick={() => {
                            navigate('edit');
                        }}
                    >
                        Tải Lên
                        <IoAddSharp 
                            size={18}
                            style={{ marginLeft: '8px' }}
                        />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Header