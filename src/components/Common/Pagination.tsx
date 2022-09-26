import React, { useEffect, useState } from 'react'
import styleTable from 'assets/styles/styleTable.module.scss';
import classNames from 'classnames/bind';
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import createPagination from 'utils/caculatePagination';

const tb = classNames.bind(styleTable);

interface PaginationProps {
    currentPage?: number,
    totalPage?: number,
    onChangeCurrentPage?: Function,
}

function Pagination({ totalPage = 1, currentPage = 1, onChangeCurrentPage }: PaginationProps) {
    const [pageShow, setPageShow] = useState<Array<string | number>>([]);

    useEffect(() => {
        if(totalPage !== 0)
        {
            for (let i = 1, l = totalPage; i <= l; i++)
            {
                if(currentPage === i)
                {
                    setPageShow(createPagination(i, l));
                    return;
                }
            }
        }
        else 
            setPageShow(createPagination(0, 0));
      
    }, [totalPage, currentPage]);

    return (
        <div
            className={tb('wrapper-pagination')}
        >
            <div className={tb('tb-pg-info')}>
                { currentPage } / { totalPage } trang
            </div>
            <div className={tb('pg-wrapper')}>
                <div className={tb('pg-btn')}
                    onClick={() => {
                        if(currentPage > 1){
                            onChangeCurrentPage && onChangeCurrentPage(currentPage - 1)
                        }
                    }}
                >
                    <IoChevronBack
                        size={18}
                    />
                </div>

                {
                    pageShow && pageShow.map((item: any, index) => {
                        return  <div
                            key={index}
                            className={tb('pg-btn', item === currentPage && 'active')}
                            onClick={() => {
                                if(item !== '...' && item !== currentPage)
                                {
                                    onChangeCurrentPage && onChangeCurrentPage(item)
                                }
                            }}
                        >{ item }</div>
                    })
                }
               
                <div 
                    className={tb('pg-btn')}
                    onClick={() => {
                        if(currentPage < totalPage){
                            onChangeCurrentPage && onChangeCurrentPage(currentPage + 1)
                        }
                    }}
                >
                    <IoChevronForward
                        size={18}
                    />
                </div>
            </div>
        </div>
    )
}

export default Pagination