import React from 'react';
import Styles from './formdata.module.scss';
import classNames from 'classnames/bind';
import { FormGroupDescription, FromGroupFareShowTime, FromGroupMovieSelect, FromGroupRoomSelect, FromGroupShowTime } from './FormInput';

const cx = classNames.bind(Styles);

function FormDataMain() {
    return (
        <div>
            <div className={cx('title-form')}>THÔNG TIN SUẤT CHIẾU</div>

            <div className={cx('grid-col-2', ['p-2'])}>
                <FromGroupMovieSelect />
                <FromGroupRoomSelect />
            </div>

            <div className={cx('grid-col-2', ['p-2'])}>
                <FromGroupShowTime />
                <FromGroupFareShowTime />
            </div>
            
            <FormGroupDescription />
        </div>
    )
}

export default React.memo(FormDataMain);