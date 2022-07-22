import React from 'react'
import Styles from './tableCustom.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(Styles);

interface TableCustomProps {
    style?: Object,

}

function TableCustom({ style }: TableCustomProps) {
    return (
        <table className={cx('main-table')} style={style}>
            <thead>
                <tr>
                    <th>Tên phim</th>
                    <th>Doanh thu</th>
                    <th>Đánh giá</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <div className={cx('m-table-text')}>
                            I Dream in Another Language
                        </div>
                    </td>
                    <td>
                        <div className={cx('m-table-text')}>
                            600.000.000
                        </div>
                    </td>
                    <td>
                        <div className={cx('m-table-text')}>
                            9.7 điểm
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className={cx('m-table-text')}>
                            I Dream in Another Language
                        </div>
                    </td>
                    <td>
                        <div className={cx('m-table-text')}>
                            600.000.000
                        </div>
                    </td>
                    <td>
                        <div className={cx('m-table-text')}>
                            9.7 điểm
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default TableCustom