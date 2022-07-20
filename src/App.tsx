import authApi from 'api/authApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { PrivateRoute } from 'components/Common';
import Admin from 'components/Layout/Admin';
import Notification from 'components/Notification';
import { AuthContext } from 'contexts/AuthContext';
import LoginPage from 'features/auth/pages/Login';
import { Fragment, useContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { addToastTopLeft } from 'reducers/toastifyReducer/toastifySlice';
import { v4 } from 'uuid';

function App() {
    const dispatch = useAppDispatch();

    const { topLeft } = useAppSelector(state => state.toastifyState);

    const { dispatchAuth } = useContext(AuthContext);

    const [checkToken, setCheckToken] = useState(false);
    const [loadingCheck, setLoadingCheck] = useState(true);

    useEffect(() => {
        if(localStorage.getItem('refreshToken')) {
            setLoadingCheck(true);
            let tokenRefresh = localStorage.getItem('refreshToken') || '';
            authApi.refreshTokenAdmin(tokenRefresh)
            .then((res: any) => {
                if(res.status === 200) {
                    localStorage.setItem('accessToken', res.accessToken);
                    localStorage.setItem('refreshToken', res.refreshToken);
                    dispatchAuth({
                        type: 'SET_USER_INFO',
                        payload: res.user,
                    });
                    setLoadingCheck(false);
                    setCheckToken(true);
                }
            })  
            .catch((err: any) => {
                setCheckToken(false);
                setLoadingCheck(false);
                dispatch(addToastTopLeft({
                    uuid: v4(),
                    position: 'top-left',
                    duration: 3500,
                    toastText: '[ERROR] TOKEN INVALID! Please login again...',
                    type: 'error',
                }))
                localStorage.clear();
            })
        } else {
            setCheckToken(false);
            setLoadingCheck(false);
        }
    }, [])

    return (
        <Fragment>
            {
                topLeft && topLeft.length > 0
                && <Notification 
                    listToast={topLeft}
                />
            }
           
            <Routes>
                {
                    !checkToken && !loadingCheck && <Route path='/login' element={<LoginPage />} />        
                }
                
                <Route element={<PrivateRoute />}>   
                    <Route path='/admin/*' element={<Admin />}/>
                </Route>

                <Route
                    path="*"
                    element={<Navigate to={checkToken && !loadingCheck ? "/admin" : "/login" } replace />}
                />
            </Routes>
        </Fragment>
    );
}

export default App;
