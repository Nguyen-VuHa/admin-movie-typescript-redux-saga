import { Button, Container, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import globalStyles from 'utils/globalStyle.module.scss';
import styles from './login.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

const gb = classNames.bind(globalStyles);
const cx = classNames.bind(styles);

export interface LoginPageProps {

}

const LoginPage = (props: LoginPageProps) => {
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');


    const handleLogin = () => {
        if(userName && passWord) {
            let objData = {
                accessToken: btoa(unescape(encodeURIComponent(passWord))),
                userName: userName,
                passWord: btoa(unescape(encodeURIComponent(passWord)))
            }

            localStorage.setItem('accessToken', JSON.stringify(objData));

            navigate('/admin', { replace: true });
        }
    }

    useEffect(() => {
        if(localStorage.getItem('accessToken')) {
            navigate('/admin', { replace: true });
        }
    }, [navigate]);
    

    return (
        <Container maxWidth="sm" >
            <div className={gb('d-flex', 'df-justify-center', 'df-align-center', cx('warapper'))}>
                <div className={cx('box')}>
                    <h2 className={cx('header-text')}>
                        Login
                    </h2>
                    <div className={gb('px-3')}>
                        <TextField 
                            className={gb('w-100', cx('color-white'))} 
                            id="standard-basic" 
                            label="UserName" 
                            color="info"
                            variant="standard" 
                            onChange={(e) => {
                                setUserName(e.target.value);
                            }}
                        />

                        <TextField 
                            className={gb('w-100', 'mt-2', cx('color-white'))} 
                            id="standard-basic" 
                            label="Password" 
                            color="info"
                            variant="standard" 
                            type="password"
                            onChange={(e) => {
                                setPassWord(e.target.value);
                            }}
                        />

                        <Button 
                            className={gb('mt-2', 'w-100')}
                            variant="outlined"
                            size="large"
                            onClick={handleLogin}
                        >
                            Đăng Nhập
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default LoginPage;