import React from 'react'
import styleTable from 'assets/styles/table.style.module.scss';
import classNames from 'classnames/bind';
import Pagination from 'components/Common/Pagination';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import LoadingTable from 'components/Common/LoadingTable';
import TableDefault from 'components/Common/TableDefault';
import { status } from 'constants/status';
import moment from 'moment';
import GroupButton from './GroupButton';
import WrapperModal from './WrapperModal';
import { setCurrentPage } from 'reducers/movieReducer/movieSlice';
import { DEFAULT_PAGE_SIZE } from 'constants/globalConstant';

const tb = classNames.bind(styleTable);

const arrTitle = [
    {
        title: 'STT',
    },
    {
        title: 'Phim',
    },
    {
        title: 'Trạng Thái',
    },
    {
        title: 'Thời lượng',
    },
    {
        title: 'Ngày bắt đầu',
    },
    {
        title: 'Ngày kết thúc',
    },
    {
        title: 'Thao tác',
    }
]

function TableMovie() {
    const dispatch = useAppDispatch();
    const { loadingFetch, movies, currentPage, totalPage, search } = useAppSelector(state => state.movieState);

    return (
       <>
            <WrapperModal />
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
                        movies && movies.length > 0 && !loadingFetch
                        ? movies.map((m: any, idx) => {
                            let statusFilter = status.filter(s => s.id === parseInt(m.status));
                            return <tr key={m.id} >
                                <td>
                                    <div className={tb('table-text')}> { idx + 1 + ((currentPage - 1) * DEFAULT_PAGE_SIZE) } </div>
                                </td>
                                <td>
                                    <div className={tb('table-text')}> { m.movie_name } </div>
                                </td>
                                <td >
                                    <div className={tb('table-text')} style={{color: statusFilter[0]?.color || "#ff9800" }}>
                                        { statusFilter[0]?.statusName || 'Không xác định' }
                                    </div>   
                                </td>
                                <td>
                                    <div className={tb('table-text')}> { m.show_time } phút</div>
                                </td>  
                                <td>
                                    <div className={tb('table-text')}>{ m.start_date && moment(m.start_date).format('DD/MM/YYYY') || '-' }</div>
                                </td>  
                                <td>
                                    <div className={tb('table-text')}>
                                        { m.end_date && moment(m.end_date).format('DD/MM/YYYY') || '-' }
                                    </div>
                                </td>  
                                <td>
                                    <div className={tb('table-text')}>
                                        <GroupButton 
                                            status={m.status}
                                            data={m}
                                        />
                                    </div>
                                </td>  
                            </tr>
                        })
                        : loadingFetch ? 
                        <tr>
                            <td colSpan={arrTitle.length}>
                                <LoadingTable textLoading="Đang tải dữ liệu..." />
                            </td>
                        </tr> 
                        : <tr>
                            <td colSpan={arrTitle.length}>
                                <TableDefault textNotify='Không có thể loại hiện hành!' />
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
                        type: 'FETCH_LIST_MOVIE',
                        payload: {
                            page: page,
                            search
                        },
                    });

                    dispatch(setCurrentPage(page));
                }}
            />
       </>
    )
}

export default TableMovie