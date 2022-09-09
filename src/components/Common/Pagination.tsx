import React from 'react'
import styleTable from 'assets/styles/styleTable.module.scss';
import classNames from 'classnames/bind';
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const tb = classNames.bind(styleTable);

function Pagination() {
    return (
        <div
            className={tb('wrapper-pagination')}
        >
            <div className={tb('tb-pg-info')}>
                10 from 14 452
            </div>
            <div className={tb('pg-wrapper')}>
                <div className={tb('pg-btn')}>
                    <IoChevronBack
                        size={18}
                    />
                </div>

                <div className={tb('pg-btn', 'active')}>
                    1
                </div>
                <div className={tb('pg-btn')}>
                    2
                </div>
                <div className={tb('pg-btn')}>
                    ...
                </div>
                <div className={tb('pg-btn')}>
                    4
                </div>

                <div className={tb('pg-btn')}>
                    <IoChevronForward
                        size={18}
                    />
                </div>
            </div>
        </div>
    )
}

export default Pagination