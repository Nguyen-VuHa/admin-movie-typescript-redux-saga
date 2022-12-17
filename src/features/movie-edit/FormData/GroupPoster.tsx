import React from 'react'
import Styles from './formdata.module.scss';
import classNames from 'classnames/bind';

import { RiImageAddFill } from "react-icons/ri";
import ModalEditPoster from './ModalEditPoster';

const cx = classNames.bind(Styles);

function GroupPoster() {
    return (
        <div>  
            <ModalEditPoster />
            <div className={cx('title-form')}>POSTER</div>
            <div className={cx('wrapper-image')}>
                <div className={cx('layout-image')}>
                    <div style={{ marginRight: '0.5rem' }}>Upload Image</div>
                    <RiImageAddFill size={20} />
                </div>
                <div className={cx('layout-image')}>

                </div>
                <div className={cx('layout-image')}>

                </div>
                <div className={cx('layout-image')}>

                </div>
            </div>
        </div>
    )
}

export default GroupPoster