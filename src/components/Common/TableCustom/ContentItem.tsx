import React from 'react'
import Styles from './tableCustom.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(Styles);

interface ContentItemProps {
    children?: any
}

function ContentItem({ children }: ContentItemProps) {
    return (
        <td>
            <div className={cx('m-table-text')}>
                {children}
            </div>
        </td>
    )
}

export default ContentItem