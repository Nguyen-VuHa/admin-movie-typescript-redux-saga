import classNames from 'classnames/bind';
import React from 'react';

import globalStyles from 'utils/globalStyle.module.scss';
import Header from './Header';
import MainContent from './MainContent';
import OverView from './OverView';

const gb = classNames.bind(globalStyles);

const DashBoardMain = () => {
 
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