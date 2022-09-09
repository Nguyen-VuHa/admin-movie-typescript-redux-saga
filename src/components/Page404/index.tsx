import React from 'react'
import classNames from 'classnames/bind';
import Styles from './page404.module.scss';
import GlobalStyles from 'utils/globalStyle.module.scss';
import Images from 'assets/images';
import { Button } from 'components/Common';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(Styles);
const gb = classNames.bind(GlobalStyles);

interface PageNotFoundProps {
    message?: string
}


let styleBackgroundImage = {
    background: `url(${Images.BACK_GROUND_LOGIN}) center center / cover no-repeat`,
}

function PageNotFound({message = 'The page you are looking for not available!'}: PageNotFoundProps) {
    const navigation = useNavigate();

    return (
        <div 
            className={gb('d-flex', 'df-justify-center', 'df-align-center', 'container-main')}
            style={styleBackgroundImage}
        >
            <div className={cx('warapper')}>
                <div className={cx('content')}>
                    <h1 className={cx('title')}>404</h1>
                    <p className={cx('text')}>{ message }</p>
                    <Button 
                        onClick={() => {
                            navigation('/');
                        }}
                    >
                        Về Trang Chủ
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound