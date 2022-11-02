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
import { Base64 } from 'js-base64';
import { encryption } from 'utils/variables';
import enCodeString from 'utils/generatorPosition';
import axios from 'axios';

const gb = classNames.bind(globalStyles);
const cx = classNames.bind(styles);

let styleBackgroundImage = {
    background: `url(${Images.BACK_GROUND_LOGIN}) center center / cover no-repeat`,
}

let urlGetIp = "https://jsonip.com";

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

            authApi.generatorKeyAuth(Base64.encode(userName))
            .then((res: any) => {
                if(res) {

                    let dataEncode = Base64.encode(`{
                        "password": "${Base64.encode(passWord)}",
                        "email": "${userName}"
                    }`);

                    let base64 = enCodeString(dataEncode, res._k);
                    let objEnCode = [];
        
                    res.e_cd.split('').map((eC: string) => {
                        let strSplit = base64.substring(0, encryption[eC]);
                        base64 = base64.replace(strSplit, '');

                        objEnCode.push({
                            [eC]: strSplit,
                        });
                    });

                    objEnCode.push({
                        N: base64,
                    });

                    authApi.loginAccount({ data: objEnCode }, Base64.encode(userName))
                    .then((res: any)=> {
                        if(res && res.status === 200) {
                            setSubmitLoading(false);
                            localStorage.setItem('accessToken', res.accessToken);
                            localStorage.setItem('refreshToken', res.refreshToken);
                            localStorage.setItem('dssKey', res.dssKey);

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
            }).catch((err: any) => {
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

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleLogin();
    }


    return (
        <div 
            className={gb('d-flex', ['df-justify-center', 'df-align-center', cx('warapper')])}
            style={styleBackgroundImage}
        >       
            <Container maxWidth="sm" className={gb('d-flex', ['df-justify-center', 'df-align-center'])}>
                <form 
                    className={cx('login-form')}
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) => { handleFormSubmit(e) }}
                >
                    <img width={200} src="https://www.tiendauroi.com/wp-content/uploads/2020/02/bhd-star-cinema.png" alt="BHD LOGO"/>
                    <Input 
                        className={gb('mt-2')}
                        placeholder="Email"
                        onChange={(text: string)  => {
                            handleChangeUserName(text);
                            setValidator(null);
                        }}
                        value={userName}
                        errMessage={validator && validator?.email || ''}
                    /> 
                    <Input 
                        className={gb('mt-1')}
                        placeholder="Mật khẩu"
                        onChange={(text: string)  => {
                            handleChangePassword(text);
                            setValidator(null);
                        }}
                        value={passWord}
                        type="password"
                        errMessage={validator && validator?.password || ''}
                    />
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
                        type="submit"
                    >
                        Đăng Nhập
                    </Button>
                </form>
            </Container>
        </div>
    )
}

export default LoginPage;