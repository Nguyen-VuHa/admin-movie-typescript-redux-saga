import { useAppDispatch } from 'app/hooks';
import classNames from 'classnames/bind';
import React, { useEffect } from 'react';

import globalStyles from 'utils/globalStyle.module.scss';
import Header from './Header';
import MainContent from './MainContent';
import OverView from './OverView';

const gb = classNames.bind(globalStyles);

const DashBoardMain = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch({type: 'FETCH_OVER_VIEW_DASHBOARD'});
    }, [])
    
    return (
        <div className={gb('container-main')}>
            <Header />
            <div className={gb('warapper-content')}>
                <OverView />
                <MainContent />
            </div>
        </div>
    )
}

export default DashBoardMain;