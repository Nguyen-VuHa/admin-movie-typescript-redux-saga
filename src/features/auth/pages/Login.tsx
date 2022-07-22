import { Container } from '@mui/material';
import authApi from 'api/authApi';
import Images from 'assets/images';
import classNames from 'classnames/bind';
import { Button, CheckBox } from 'components/Common';
import Input from 'components/Common/Input';
import { AuthContext } from 'contexts/AuthContext';
import { handleValidationLogin } from 'middlewares/authLogin';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import globalStyles from 'utils/globalStyle.module.scss';
import styles from './login.module.scss';
import useToastify from 'hooks/useToastify';

const gb = classNames.bind(globalStyles);
const cx = classNames.bind(styles);


let styleBackgroundImage = {
    background: `url(${Images.BACK_GROUND_LOGIN}) center center / cover no-repeat`,
}

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatchToast = useToastify();

    const [userName, setUserName] = useState('admin@gmail.com');
    const [passWord, setPassWord] = useState('123123123');
    const [rememberLogin, setRememberLogin] = useState(false);
    const [validator, setValidator] = useState<any>(null);
    const [submitLoading, setSubmitLoading] = useState(false);

    const { dispatchAuth } = useContext(AuthContext);

    useEffect(() => {
        if(localStorage.getItem('accessToken')) {
            navigate('/admin', { replace: true });
        }
    }, [navigate]);

    const handleChangeUserName = useCallback((txtUserName: string) => {
        setUserName(txtUserName)
    }, []);

    const handleChangePassword = useCallback((txtPassword: string) => {
        setPassWord(txtPassword)
    }, []);
    
   

    const handleLogin = async () => {
        let checkValid = handleValidationLogin({
            email: userName,
            password: passWord,
        }, setValidator);

        if(userName && passWord && checkValid) {    
            setSubmitLoading(true);
            authApi.loginAccount({
                email: userName,
                password: passWord,
            })
            .then((res: any) => {
                if(res && res.status === 200) {
                    setSubmitLoading(false);
                    localStorage.setItem('accessToken', res.accessToken);
                    localStorage.setItem('refreshToken', res.refreshToken);

                    dispatchAuth({
                        type: 'SET_USER_INFO',
                        payload: res.user,
                    });

                    dispatchToast({
                        type: 'TYPE_SUCCESS',
                        payload: {
                            position: 'top-left',
                            message: 'login admin page successfully!',
                        }
                    });
                    
                    navigate('/');
                }
                else {
                    setSubmitLoading(false);
                    dispatchToast({
                        type: 'TYPE_WARN',
                        payload: {
                            position: 'top-left',
                            message: res.message,
                        }
                    });
                }
            })
            .catch((err: any) => {
                setSubmitLoading(false);
                dispatchToast({
                    type: 'TYPE_WARN',
                    payload: {
                        position: 'top-left',
                        message: err.message,
                    }
                });
            })
        }
    }


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
                            handleChangeUserName(text);
                            setValidator(null);
                        }}
                        value={userName}
                    /> 
                    <small className={cx('text-error')}>{ validator && validator?.email }</small>
                    <Input 
                        className={gb('mt-1')}
                        placeholder="Mật khẩu"
                        onChange={(text: string)  => {
                            handleChangePassword(text);
                            setValidator(null);
                        }}
                        value={passWord}
                        type="password"
                    />
                    <small className={cx('text-error')}>{ validator && validator?.password }</small> 
                    <CheckBox
                        className={gb('mt-1')}
                        value={rememberLogin}
                        onClick={() => setRememberLogin(!rememberLogin)}
                    >
                        Lưu đăng nhập
                    </CheckBox>
                    <Button
                        className={gb('mt-1')}
                        onClick={() => handleLogin()}
                        loading={submitLoading}
                    >
                        Đăng Nhập
                    </Button>
                </div>
            </Container>
        </div>
    )
}

export default LoginPage;