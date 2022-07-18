import React from 'react'
import styles from './sidebar.module.scss';
import classNames from 'classnames/bind';
import { Scrollbars } from 'react-custom-scrollbars-2';
import globalStyles from 'utils/globalStyle.module.scss';
import UserDetail from './UserDetail';

const cx = classNames.bind(styles);
const gb = classNames.bind(globalStyles);

interface PropsMainSideBar {

}

export default function MainSideBar({}: PropsMainSideBar) {
    return (
        <div className={cx('container')}>
            <a className={cx('logo')}>
                <img width={150} src="https://www.tiendauroi.com/wp-content/uploads/2020/02/bhd-star-cinema.png" alt="LOGO_NULL"/>
            </a>

            <UserDetail />
            <div className={cx('sb-nav-warpper')}>
                <Scrollbars 
                    style={{ width: '100%', height: 'calc(100vh - 230px)'}}
                    renderThumbVertical={props => <div {...props} className={gb('theme-custom-scrollbar')}/>}
                >
                     {/*List Nav Bar Menu  */}
                </Scrollbars>
            </div>
            <div className={cx('sb-copyright')}>
                © copyright by HOTFLIX, 2019—2021. <br/>Created by 
                <a href="https://themeforest.net/user/dmitryvolkov/portfolio" rel="noreferrer" target="_blank">Dmitry Volkov</a>
            </div>
        </div>
    )
}