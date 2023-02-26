import React from 'react';
import Styles from './formdata.module.scss';
import classNames from 'classnames/bind';
import { FromGroupAddressCinema, FromGroupCinemaName, FromGroupPositionLat, FromGroupPositionLng, FromGroupSiteSelect } from './FormInput';

const cx = classNames.bind(Styles);

function FormDataMain() {
    return (
        <div>
            <div className={cx('title-form')}>THÔNG TIN CỤM RẠP</div>

            <div className={cx('grid-col-2', ['p-2'])}>
                <FromGroupSiteSelect />
                <FromGroupCinemaName />
            </div>

            <div className={cx('grid-col-2', ['p-2'])}>
                <FromGroupPositionLng />
                <FromGroupPositionLat />
            </div>
            
            <FromGroupAddressCinema />
        </div>
    )
}

export default React.memo(FormDataMain);