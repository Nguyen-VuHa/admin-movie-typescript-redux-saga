import React, { ReactNode } from 'react'
import Styles from './tableCustom.module.scss';
import classNames from 'classnames/bind';
import Header from './Header';
import Content from './Content';

const cx = classNames.bind(Styles);


interface TableCustomProps {
    style?: Object,
    tableTitle?: Array<string>,
    tableContent?: Array<string | ReactNode>
}

function TableCustom({ style, tableTitle = [], tableContent = [] }: TableCustomProps) {

    return (
        <table className={cx('main-table')} style={style}>
            <Header 
                titles={tableTitle}
            />
            <Content 
                datas={tableContent}
            />
        </table>
    )
}

export default TableCustom