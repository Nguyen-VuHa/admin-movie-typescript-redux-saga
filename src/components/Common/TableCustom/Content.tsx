import React, { ReactNode } from 'react'
import Styles from './tableCustom.module.scss';
import classNames from 'classnames/bind';
import ContentItem from './ContentItem';

const cx = classNames.bind(Styles);

interface TableContentProps {
    datas?: Array<any>,
}

function Content({ datas }: TableContentProps) {
    return (
        <tbody>
            {
                datas && datas.length > 0
                ? datas.map((data, index) => {
                    return <ContentItem 
                        key={index}
                        children={data}
                    />
                }) : <tr>
                        <td>
                            <div className={cx('m-table-text')}>
                                Nội dung rỗng
                            </div>
                        </td>
                </tr>
            }

                {/* <tr>
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
                    </tr> */}
        </tbody>
    )
}

export default Content