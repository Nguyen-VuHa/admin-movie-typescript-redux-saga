import { Container } from '@mui/material';
import Images from 'assets/images';
import classNames from 'classnames/bind';
import { Button, CheckBox, Input } from 'components/Common';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import globalStyles from 'utils/globalStyle.module.scss';
import styles from './login.module.scss';

const gb = classNames.bind(globalStyles);
const cx = classNames.bind(styles);

export interface LoginPageProps {

}

let styleBackgroundImage = {
    background: `url(${Images.BACK_GROUND_LOGIN}) center center / cover no-repeat`,
}

const LoginPage = (props: LoginPageProps) => {
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [rememberLogin, setRememberLogin] = useState(false);


    // const handleLogin = () => {
    //     if(userName && passWord) {
    //         let objData = {
    //             accessToken: btoa(unescape(encodeURIComponent(passWord))),
    //             userName: userName,
    //             passWord: btoa(unescape(encodeURIComponent(passWord)))
    //         }

    //         localStorage.setItem('accessToken', JSON.stringify(objData));

    //         navigate('/admin', { replace: true });
    //     }
    // }

    useEffect(() => {
        if(localStorage.getItem('accessToken')) {
            navigate('/admin', { replace: true });
        }
    }, [navigate]);
    

    return (
        <div 
            className={gb('d-flex', 'df-justify-center', 'df-align-center', cx('warapper'))}
            style={styleBackgroundImage}
        >       
            <Container maxWidth="sm" className={gb('d-flex', 'df-justify-center', 'df-align-center')}>
                <div className={cx('login-form')}>
                    <img width={200} src="https://www.tiendauroi.com/wp-content/uploads/2020/02/bhd-star-cinema.png" alt="BHD LOGO"/>
                    <Input 
                        className={gb('mt-2')}
                        placeholder="Email"
                        onChange={(text: string)  => {
                            setUserName(text);
                        }}
                        value={userName}
                    />  
                    <Input 
                        className={gb('mt-2')}
                        placeholder="Mật khẩu"
                        onChange={(text: string)  => {
                            setPassWord(text);
                        }}
                        value={passWord}
                        type="password"
                    /> 
                    <CheckBox
                        className={gb('mt-1')}
                        value={rememberLogin}
                        onClick={() => setRememberLogin(!rememberLogin)}
                    >
                        Remember me
                    </CheckBox>
                    <Button
                        className={gb('mt-1')}
                    >
                        Đăng Nhập
                    </Button>
                </div>
            </Container>
        </div>
    )
}

export default LoginPage;