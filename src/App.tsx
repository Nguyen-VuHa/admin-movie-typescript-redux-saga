import authApi from 'api/authApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { PrivateRoute } from 'components/Common';
import Admin from 'components/Layout/Admin';
import Notification from 'components/Notification';
import { AuthContext } from 'contexts/AuthContext';
import LoginPage from 'features/auth/pages/Login';
import useToastify from 'hooks/useToastify';
import { Fragment, useContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
    const dispatch = useAppDispatch();
    const { topLeft } = useAppSelector(state => state.toastifyState);
    const { dispatchAuth } = useContext(AuthContext);
    const dispatchToast = useToastify();

    useEffect(() => {
        if(localStorage.getItem('refreshToken')) {
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
                }
            })  
            .catch(() => {
                let messageError = '[ERROR] TOKEN INVALID! Please login again...';
                dispatchToast({
                    type: 'TYPE_ERROR',
                    payload: {
                        position: 'top-left',
                        message: messageError,
                    }
                });
                localStorage.clear();
            })
        }
    }, [dispatch, dispatchAuth]);

    return (
        <Fragment>
            {
                topLeft && topLeft.length > 0
                && <Notification 
                    listToast={topLeft}
                />
            }
           
            <Routes>
                <Route element={<PrivateRoute />}>   
                    <Route path='/admin/*' element={<Admin />}/>
                </Route>

                <Route path='/login' element={<LoginPage />} />

                <Route path='/admin' element={<Navigate to={"/admin/dashboard"} replace />} />
                <Route
                    path="*"
                    element={<Navigate to={"/admin/dashboard"} replace />}
                />
            </Routes>
        </Fragment>
    );
}

export default App;
