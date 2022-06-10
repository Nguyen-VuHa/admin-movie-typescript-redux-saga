import * as React from 'react';
import { Navigate, Outlet, RouteProps } from 'react-router-dom';

export function PrivateRoute(props: RouteProps) {
    const isLoggedIn = Boolean(localStorage.getItem('accessToken'));

    if(!isLoggedIn)
        return <Navigate to="/login" {...props} /> 
    else
        return <Outlet />
}
