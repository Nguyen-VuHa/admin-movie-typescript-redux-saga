import React from 'react';
import styleTable from 'assets/styles/table.style.module.scss';
import classNames from 'classnames/bind';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import LoadingTable from 'components/Common/LoadingTable';
import TableDefault from 'components/Common/TableDefault';
import GroupButton from './GroupButton';
import Pagination from 'components/Common/Pagination';
import moment from 'moment';
import { status } from 'constants/status';
import { setCurrentPage } from 'reducers/showtimeReducer/showtimeSlice';
import { DEFAULT_PAGE_SIZE } from 'constants/globalConstant';

const tb = classNames.bind(styleTable);

const arrTitle = [
    {
        title: 'STT',
        width: 50,
    },
    {
        title: 'Mã suất chiếu',
        width: 100,
    },
    {
        title: 'Thời gian',
        width: 200,
    },
    {
        title: 'Giá tiền',
        width: 150,
    },
    {
        title: 'Trạng thái',
        width: 300,
    },
    {
        title: 'Phim',
        width: 150,
    },
    {
        title: 'Phòng chiếu',
        width: 300,
    },
    {
        title: 'Options',
        width: 200,
    }
];

function TableShowtimeMain() {
    const dispatch = useAppDispatch();

    const { showtimes, loadingFetch, currentPage, totalPage } = useAppSelector(state => state.showtimeState);
    
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 'auto'}}>
            <table className={tb('wrapper-table')}>
                <thead>
                    <tr>
                        {
                            arrTitle.map((arrT, index) => {
                                return  <th 
                                    key={index}
                                >
                                    { arrT.title }
                                </th>
                            })
                        } 
                    </tr>
                </thead>
                <tbody>
                    {
                        showtimes && showtimes.length > 0 ? 
                        showtimes.map((s, idx) => {
                            let statusFilter = status.filter(ss => ss.id === s.status);
                            return <tr key={s.id} >
                                <td>
                                    <div className={tb('table-text')}>{ (idx + 1) + ((currentPage - 1) * DEFAULT_PAGE_SIZE)}</div>
                                </td>
                                <td>
                                    <div className={tb('table-text')}>{ s.code }</div>
                                </td>
                                <td>
                                    <div className={tb('table-text')}> { moment(s.showtime).format('HH:mm DD/MM/YYYY') }</div>
                                
                                </td>  
                                <td>
                                    <div className={tb('table-text')}>{ s.fare.toLocaleString() } đ</div>
                                </td> 
                                <td>
                                <div className={tb('table-text')} style={{color: statusFilter[0]?.color || "#ff9800" }}>
                                        { statusFilter[0]?.statusName || 'Không xác định' }
                                    </div>   
                                </td>  
                                <td>
                                    <div className={tb('table-text')}>{ s.movieName}</div>
                                </td>
                                <td>
                                    <div className={tb('table-text')}>{ `${s.roomName} - ${s.roomType}` }</div>
                                </td>
                                <td>
                                    <div className={tb('table-text')}>
                                        <GroupButton 
                                            // status={s.status}
                                            data={s}
                                        />
                                    </div>
                                </td>
                            </tr>
                        })
                        : loadingFetch ? 
                        <tr>
                            <td colSpan={arrTitle.length}>
                                <LoadingTable textLoading="Đang tải dữ liệu..."/>
                            </td>
                        </tr> 
                        : <tr>
                            <td colSpan={arrTitle.length}>
                                <TableDefault textNotify='Không có suất chiếu hiện hành!'/>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>

            <Pagination 
                currentPage={currentPage}
                totalPage={totalPage}
                onChangeCurrentPage={(page: number) => {
                    dispatch(setCurrentPage(page));
                }}
            />
        </div>
    );
};

export default TableShowtimeMain;