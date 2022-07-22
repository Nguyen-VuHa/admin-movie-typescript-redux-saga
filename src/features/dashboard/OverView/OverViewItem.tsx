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

function OverViewItem({title = 'Title', value = '0...', icon, loading = false}: OverviewItemProps) {
    return (
        <div className={cx('ov-item-layout')}>
            <div className={cx('ov-item-wrapper')}>
                <span className={cx('ov-item-title', loading && gb('skeleton-loading'))}>{ !loading && title }</span>
                <div className={cx('ov-item-value')}>
                    <p className={cx('ov-value-text', loading && gb('skeleton-loading'))}>{ !loading && value }</p>
                    { loading && <div className={gb('skeleton-loading')} style={{width: '36px'}}/> }
                    {
                        !loading && icon ? icon : <IoFilm 
                            color="#f9ab00"
                            size={36}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default OverViewItem