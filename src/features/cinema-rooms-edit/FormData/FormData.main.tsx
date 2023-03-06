import React from 'react';
import Styles from './formdata.module.scss';
import classNames from 'classnames/bind';
import { FromGroupCinemaSelect, FromGroupHorizontalSize, FromGroupRoomName, FromGroupRoomType, FromGroupSiteSelect, FromGroupVerticalSize } from './FormInput';

const cx = classNames.bind(Styles);

function FormDataMain() {
    return (
        <div>
            <div className={cx('title-form')}>THÔNG TIN PHÒNG CHIẾU</div>

            <div className={cx('grid-col-2', ['p-2'])}>
                <FromGroupSiteSelect />
                <FromGroupCinemaSelect />
            </div>

            <div className={cx('grid-col-2', ['p-2'])}>
                <FromGroupRoomName />
                <FromGroupRoomType />
            </div>

            <div className={cx('grid-col-2', ['p-2'])}>
                <FromGroupHorizontalSize />
                <FromGroupVerticalSize />
            </div>
            
            
        </div>
    )
}

export default React.memo(FormDataMain);