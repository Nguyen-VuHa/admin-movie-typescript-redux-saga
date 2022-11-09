import React from 'react'
import styleTable from 'assets/styles/table.style.module.scss';
import classNames from 'classnames/bind';
import Pagination from 'components/Common/Pagination';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import TableDefault from 'components/Common/TableDefault';
import LoadingTable from 'components/Common/LoadingTable';
import moment from 'moment';
import { status } from 'constants/status';
import GroupButton from './GroupButton';
import WrapperModal from './WrapperModal';
import { setCurrentPageAuthorActor } from 'reducers/authorActorReducer/authorActorSlice';

const tb = classNames.bind(styleTable);

const headerTable = [
    {
        title: 'STT',
        width: 50,
    },
    {
        title: 'Họ & tên',
        width: 200,
    },
    {
        title: 'Loại',
        width: 150,
    },
    {
        title: 'Trạng Thái',
        width: 150,
    },
    {
        title: 'Ngày Tạo',
        width: 150,
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
    const { loadingFetch, authorActors, totalPage, currentPage, search, type } = useAppSelector(state => state.authorActorState);

    return (
       <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 'auto'}}>
            <WrapperModal />

            <table className={tb('wrapper-table')}>
                <thead>
                    <tr>
                        {
                            headerTable.map(ht => {
                                return  <th 
                                    key={ht.title}
                                >
                                    { ht.title }
                                </th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        authorActors && authorActors.length > 0
                        ? authorActors.map((ac, index) => {
                            let statusFilter = status.filter(s => s.id === ac.status);

                            return <tr className={tb('tb-content-item')} key={index} >
                                <td>
                                    <div className={tb('table-text')}>{ index + 1}</div>
                                </td>
                                <td>
                                    <div className={tb('table-text')}>{ ac.name }</div>
                                </td>
                                <td>
                                    <div className={tb('table-text')}>{ ac.type }</div>
                                </td>
                                <td>
                                    <div className={tb('table-text')} style={{color: statusFilter[0]?.color || "#ff9800" }}>  
                                        { statusFilter[0]?.statusName || 'Không xác định' }
                                    </div>    
                                </td>
                                <td>
                                    <div className={tb('table-text')}>{ moment(ac.createdAt).format('HH:mm DD/MM/YYYY') }</div>
                                </td>  
                                <td>
                                    <div className={tb('table-text')}>{ ac.createdBy }</div>
                                </td>  
                                <td>
                                    <div className={tb('table-text')}>
                                        <GroupButton 
                                            status={ac.status}
                                            data={ac}
                                        />
                                    </div>
                                </td>  
                        </tr>
                        })
                        : loadingFetch ? 
                        <tr>
                            <td colSpan={headerTable.length}>
                                <LoadingTable textLoading="Đang tải dữ liệu..."/>
                            </td>
                        </tr>
                        : <tr>
                            <td colSpan={headerTable.length}>
                                <TableDefault textNotify='Không có đạo diễn hoặc diễn viên hiện hành!'/>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
            <Pagination 
                currentPage={currentPage}
                totalPage={totalPage}
                onChangeCurrentPage={(page: number) => {
                    dispatch({
                        type: 'FETCH_LIST_AUTHOR_ACTOR',
                        payload: {
                            page: currentPage,
                            search,
                            type
                        },
                    });

                    dispatch(setCurrentPageAuthorActor(page));
                }}
            />
       </div>
    )
}

export default TableAuthorMainActor;