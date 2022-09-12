import React, { useContext } from 'react'
import classNames from 'classnames/bind';
import styles from './sidebar.module.scss';
import { Button } from 'components/Common';
import { IoLogOutOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'contexts/AuthContext';

const cx = classNames.bind(styles);

export default function UserDetail() {
    const navigate = useNavigate();
    const { stateAuth } = useContext(AuthContext);

    return (
        <div className={cx('user')}>
            <div className={cx('sb-user-image')}>
                <img src={(stateAuth && stateAuth.avartar) || "https://upanh123.com/wp-content/uploads/2021/03/hinh-nen-may-tinh-3d-1024x768.jpg"}  alt="USER NULL"/>
            </div>

            <div className={cx('sb-user-title')}>
                <span>{stateAuth && stateAuth.role === 0 ? 'Admin' : ''}</span>
                <p title='Admin BHD Star Cineplex'>{stateAuth && stateAuth.fullname}</p>
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