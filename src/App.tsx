import { useAppSelector } from 'app/hooks';
import { PrivateRoute } from 'components/Common';
import Admin from 'components/Layout/Admin';
import Notification from 'components/Notification';
import LoginPage from 'features/auth/pages/Login';
import { Fragment } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
    const { topLeft } = useAppSelector(state => state.toastifyState);

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
                    !localStorage.getItem('accessToken') && <Route path='/login' element={<LoginPage />} />        
                }
                
                <Route element={<PrivateRoute />}>
                    <Route path='/admin/*' element={<Admin />}/>
                </Route>

                <Route
                    path="*"
                    element={<Navigate to={localStorage.getItem('accessToken') ? "/admin" : "/login" } replace />}
                />
            </Routes>
        </Fragment>
    );
}

export default App;
