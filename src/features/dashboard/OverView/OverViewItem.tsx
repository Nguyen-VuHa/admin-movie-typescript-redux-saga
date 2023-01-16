import React, { ReactNode } from 'react'
import Styles from './overview.module.scss';
import classNames from 'classnames/bind';
import { IoFilm } from 'react-icons/io5';
import GlobalStyles from 'utils/globalStyle.module.scss';

const cx = classNames.bind(Styles);
const gb = classNames.bind(GlobalStyles);

interface OverviewItemProps {
    title?: string,
    value?: string,
    icon?: ReactNode,
    loading?: boolean,
}

function OverViewItem({title = 'Title', value = 'NAN', icon, loading = false}: OverviewItemProps) {
    return (
        <div className={cx('ov-item-layout')}>
            <div className={cx('ov-item-wrapper')}>
                <span className={cx('ov-item-title', loading && gb('skeleton-loading'))}>{ !loading && title }</span>
                <div className={cx('ov-item-value')}>
                    <p className={cx('ov-value-text', loading && gb('skeleton-loading'))}>{ !loading && value }</p>
                    <div className={gb(loading && 'skeleton-loading')} style={{width: '36px', height: '36px'}}>
                        { !loading && icon ? icon : "" }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverViewItem