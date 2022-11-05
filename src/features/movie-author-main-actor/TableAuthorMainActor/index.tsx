import React from 'react'
import styleTable from 'assets/styles/styleTable.module.scss';
import classNames from 'classnames/bind';
import Pagination from 'components/Common/Pagination';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import TableDefault from 'components/Common/TableDefault';
import LoadingTable from 'components/Common/LoadingTable';
import moment from 'moment';

const tb = classNames.bind(styleTable);

const headerTable = [
    {
        title: 'STT',
        width: 50,
    },
    {
        title: 'Họ & tên',
        width: 250,
    },
    {
        title: 'Loại',
        width: 200,
    },
    {
        title: 'Trạng thái',
        width: 200,
    },
    {
        title: 'Người tạo',
        width: 200,
    },
    {
        title: 'Options',
        width: 200,
    }
]


function TableAuthorMainActor() {
    const dispatch = useAppDispatch();
    const { loadingFetch, authorActors, totalPage, currentPage, search } = useAppSelector(state => state.authorActorState);

    return (
       <>
            <div className={tb('wrapper-table')}>
                <div
                    className={tb('tb-header')}
                >
                    {
                        headerTable.map(ht => {
                            return  <div 
                                key={ht.title}
                                className={tb('tb-header-title')}
                                style={{width: `${ht.width}px`}}
                            >
                                { ht.title }
                            </div>
                        })
                    }
                </div>
                <ul
                    className={tb('tb-content')}
                >
                    {
                        authorActors && authorActors.length > 0
                        ? authorActors.map((ac, index) => {
                            return <li className={tb('tb-content-item')} key={ac.id}>
                                <div style={{width: `${headerTable[0].width}px`}}>
                                    { index + 1}
                                </div>
                                <div style={{width: `${headerTable[1].width}px`}}>
                                    { ac.name }
                                </div>
                                <div style={{width: `${headerTable[2].width}px`}}>
                                    { ac.type }
                                </div>
                                <div style={{width: `${headerTable[3].width}px`}}>
                                    { ac.status }
                                </div>
                                <div style={{width: `${headerTable[4].width}px`}}>
                                    { moment(ac.createdAt).format('HH:mm DD/MM/YYYY') }
                                </div>
                                <div style={{width: `${headerTable[5].width}px`}}>

                                </div>
                            </li>
                        })
                        : loadingFetch ? <LoadingTable textLoading="Đang tải dữ liệu..."/> : <TableDefault textNotify='Không có đạo diễn hoặc diễn viên hiện hành!'/>
                    }
                </ul>
            </div>
            <Pagination 
                currentPage={currentPage}
                totalPage={totalPage}
                onChangeCurrentPage={(page: number) => {
                    // dispatch({
                    //     type: 'FETCH_ALL_CATEGORIES',
                    //     payload: {
                    //         page,
                    //         search
                    //     },
                    // });

                    // dispatch(setCurrentPage(page));
                }}
            />
       </>
    )
}

export default TableAuthorMainActor;