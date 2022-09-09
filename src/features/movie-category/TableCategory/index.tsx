import React from 'react'
import styleTable from 'assets/styles/styleTable.module.scss';
import classNames from 'classnames/bind';
import Pagination from 'components/Common/Pagination';

const tb = classNames.bind(styleTable);

function TableCategory() {
    return (
       <>
            <div className={tb('wrapper-table')}>
                <div
                    className={tb('tb-header')}
                >
                    <div 
                        className={tb('tb-header-title')}
                        style={{width: '10px'}}
                    >
                        ID
                    </div>
                    <div 
                        className={tb('tb-header-title')}
                    >
                        TITLE
                    </div>
                    <div 
                        className={tb('tb-header-title')}
                    >
                        RATING
                    </div>
                    <div 
                        className={tb('tb-header-title')}
                    >
                    CATEGORY
                    </div>
                    <div 
                        className={tb('tb-header-title')}
                    >
                        VIEW
                    </div>
                    <div 
                        className={tb('tb-header-title')}
                    >
                        STATUS
                    </div>
                    <div 
                        className={tb('tb-header-title')}
                    >
                        CREATED DATE
                    </div>
                    <div 
                        className={tb('tb-header-title')}
                    >
                        ACTION
                    </div>
                </div>
                <ul
                    className={tb('tb-content')}
                >
                    <li className={tb('tb-content-item')}>
                        <div>
                            ID
                        </div>
                        <div>
                            TITLE
                        </div>
                        <div>
                            RATING
                        </div>
                        <div>
                            CATEGORY
                        </div>
                        <div>
                            VIEW
                        </div>
                        <div>
                            STATUS
                        </div>
                        <div>
                            CREATED DATE
                        </div>
                        <div>
                            ACTION
                        </div>
                    </li>
                    <li className={tb('tb-content-item')}>
                    <div>
                            ID
                        </div>
                        <div>
                            TITLE
                        </div>
                        <div>
                            RATING
                        </div>
                        <div>
                            CATEGORY
                        </div>
                        <div>
                            VIEW
                        </div>
                        <div>
                            STATUS
                        </div>
                        <div>
                            CREATED DATE
                        </div>
                        <div>
                            ACTION
                        </div>
                    </li>
                    <li className={tb('tb-content-item')}>
                    <div>
                            ID
                        </div>
                        <div>
                            TITLE
                        </div>
                        <div>
                            RATING
                        </div>
                        <div>
                            CATEGORY
                        </div>
                        <div>
                            VIEW
                        </div>
                        <div>
                            STATUS
                        </div>
                        <div>
                            CREATED DATE
                        </div>
                        <div>
                            ACTION
                        </div>
                    </li>
                    <li className={tb('tb-content-item')}>
                    <div>
                            ID
                        </div>
                        <div>
                            TITLE
                        </div>
                        <div>
                            RATING
                        </div>
                        <div>
                            CATEGORY
                        </div>
                        <div>
                            VIEW
                        </div>
                        <div>
                            STATUS
                        </div>
                        <div>
                            CREATED DATE
                        </div>
                        <div>
                            ACTION
                        </div>
                    </li>
                    <li className={tb('tb-content-item')}>
                    <div>
                            ID
                        </div>
                        <div>
                            TITLE
                        </div>
                        <div>
                            RATING
                        </div>
                        <div>
                            CATEGORY
                        </div>
                        <div>
                            VIEW
                        </div>
                        <div>
                            STATUS
                        </div>
                        <div>
                            CREATED DATE
                        </div>
                        <div>
                            ACTION
                        </div>
                    </li>
                    <li className={tb('tb-content-item')}>
                        <div>
                            ID
                        </div>
                        <div>
                            TITLE
                        </div>
                        <div>
                            RATING
                        </div>
                        <div>
                            CATEGORY
                        </div>
                        <div>
                            VIEW
                        </div>
                        <div>
                            STATUS
                        </div>
                        <div>
                            CREATED DATE
                        </div>
                        <div>
                            ACTION
                        </div>
                    </li>
                    <li className={tb('tb-content-item')}>
                        <div>
                            ID
                        </div>
                        <div>
                            TITLE
                        </div>
                        <div>
                            RATING
                        </div>
                        <div>
                            CATEGORY
                        </div>
                        <div>
                            VIEW
                        </div>
                        <div>
                            STATUS
                        </div>
                        <div>
                            CREATED DATE
                        </div>
                        <div>
                            ACTION
                        </div>
                    </li>
                    <li className={tb('tb-content-item')}>
                        <div>
                            ID
                        </div>
                        <div>
                            TITLE
                        </div>
                        <div>
                            RATING
                        </div>
                        <div>
                            CATEGORY
                        </div>
                        <div>
                            VIEW
                        </div>
                        <div>
                            STATUS
                        </div>
                        <div>
                            CREATED DATE
                        </div>
                        <div>
                            ACTION
                        </div>
                    </li>
                    <li className={tb('tb-content-item')}>
                        <div>
                            ID
                        </div>
                        <div>
                            TITLE
                        </div>
                        <div>
                            RATING
                        </div>
                        <div>
                            CATEGORY
                        </div>
                        <div>
                            VIEW
                        </div>
                        <div>
                            STATUS
                        </div>
                        <div>
                            CREATED DATE
                        </div>
                        <div>
                            ACTION
                        </div>
                    </li>
                    <li className={tb('tb-content-item')}>
                        <div>
                            ID
                        </div>
                        <div>
                            TITLE
                        </div>
                        <div>
                            RATING
                        </div>
                        <div>
                            CATEGORY
                        </div>
                        <div>
                            VIEW
                        </div>
                        <div>
                            STATUS
                        </div>
                        <div>
                            CREATED DATE
                        </div>
                        <div>
                            ACTION
                        </div>
                    </li>
                </ul>
            </div>
            <Pagination 
                
            />
       </>
    )
}

export default TableCategory;