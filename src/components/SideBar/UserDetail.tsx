import React from 'react'
import classNames from 'classnames/bind';
import styles from './sidebar.module.scss';
import { Button } from 'components/Common';
import { IoLogOutOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function UserDetail() {
    const navigate = useNavigate();

    return (
        <div className={cx('user')}>
            <div className={cx('sb-user-image')}>
                <img src="https://res.cloudinary.com/cgv-vi-t-nam/image/upload/v1635672981/image_user/ikbpzxsp6mpfto2bvseg.jpg"  alt="USER_NULL"/>
            </div>

            <div className={cx('sb-user-title')}>
                <span>admin</span>
                <p title='Admin BHD Star Cineplex'>Admin BHD Star Cineplex</p>
            </div>
            
            
            <Button 
                style={{width: '40px', height: '40px', marginLeft: 'auto', padding: 5}}
                title="Đăng xuất"
                onClick={() => {
                    localStorage.clear();
                    navigate('/');
                }}
            >
                <IoLogOutOutline
                    size={20}
                />
            </Button>
        </div>
    )
}